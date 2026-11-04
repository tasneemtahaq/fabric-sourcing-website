"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const MODEL_URL = "/models/robot.glb";

/* ------------------------------------------------------------------ *
 * TUNING — adjust these to taste once your model is in place.
 * ------------------------------------------------------------------ */
const ROBOT_HEIGHT = 3.4; // world units, model is auto-normalised to this
const WAVE_PERIOD = 8; // seconds between wave starts
const WAVE_START = 2.5; // first wave begins this many seconds after load
const WAVE_LENGTH = 3.6; // seconds the wave lasts
const WAVE_SPEED = 7; // forearm sway speed
// Target directions (world space, x is multiplied by arm "outward" sign)
const IDLE_UPPER = new THREE.Vector3(0.18, -1, 0.05);
const WAVE_UPPER = new THREE.Vector3(0.75, 0.75, 0.2);
const IDLE_FORE = new THREE.Vector3(0.05, -1, 0.35);
const WAVE_FORE = new THREE.Vector3(0.25, 1, 0.15);

type Side = "left" | "right";
interface ArmRig {
  upper: THREE.Bone;
  fore: THREE.Bone;
  hand: THREE.Bone | null;
  outward: number; // +1 = viewer's right, -1 = viewer's left
}
interface Rig {
  head: THREE.Bone | null;
  spine: THREE.Bone | null;
  arms: ArmRig[];
  rest: Map<THREE.Bone, THREE.Quaternion>;
}

/* ------------------------------ bone lookup ------------------------------ */
const sideRe = (s: Side) =>
  s === "right"
    ? /right|(^|[_.\-:\s])r($|[_.\-:\s\d])/i
    : /left|(^|[_.\-:\s])l($|[_.\-:\s\d])/i;
const FINGER = /thumb|index|middle|ring|pinky|finger|digit/i;

function findBone(
  bones: THREE.Bone[],
  side: Side | null,
  includes: RegExp[],
  exclude?: RegExp,
): THREE.Bone | null {
  const sre = side ? sideRe(side) : null;
  for (const inc of includes) {
    const hit = bones.find(
      (b) =>
        inc.test(b.name) &&
        (!sre || sre.test(b.name)) &&
        !(exclude && exclude.test(b.name)),
    );
    if (hit) return hit;
  }
  return null;
}

function buildRig(scene: THREE.Object3D): Rig {
  const bones: THREE.Bone[] = [];
  scene.traverse((o) => {
    if ((o as THREE.Bone).isBone) bones.push(o as THREE.Bone);
  });

  const rest = new Map<THREE.Bone, THREE.Quaternion>();
  bones.forEach((b) => rest.set(b, b.quaternion.clone()));

  const arms: ArmRig[] = [];
  (["left", "right"] as Side[]).forEach((side) => {
    const upper = findBone(bones, side, [/upper.?arm/i, /arm/i], /fore|lower|low|hand|twist|finger|armature|shoulder|clav/i);
    const fore = findBone(bones, side, [/fore.?arm|lower.?arm|elbow/i], /twist/i);
    if (!upper || !fore) return;
    const hand =
      findBone(bones, side, [/hand|wrist/i], FINGER) ??
      (fore.children.find((c) => (c as THREE.Bone).isBone) as THREE.Bone | undefined) ??
      null;
    arms.push({ upper, fore, hand, outward: 1 });
  });

  // Decide viewer-left / viewer-right from actual world positions.
  scene.updateWorldMatrix(true, true);
  const wp = (b: THREE.Bone) => b.getWorldPosition(new THREE.Vector3()).x;
  if (arms.length >= 2) {
    arms.sort((a, b) => wp(a.upper) - wp(b.upper));
    arms[0].outward = -1;
    arms[arms.length - 1].outward = 1;
  }

  const head = findBone(bones, null, [/head/i], /top|end|headset|light|ear/i);
  const spine = findBone(bones, null, [/spine|chest|torso/i], /end/i);

  if (process.env.NODE_ENV === "development") {
    console.info(
      "[Robot] bones:", bones.map((b) => b.name),
      "\n[Robot] matched:", {
        head: head?.name, spine: spine?.name,
        arms: arms.map((a) => [a.upper.name, a.fore.name, a.hand?.name]),
      },
    );
  }
  return { head, spine, arms, rest };
}

/* ------------------------- world-space bone helpers ---------------------- */
const _p0 = new THREE.Vector3();
const _p1 = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _tgt = new THREE.Vector3();
const _qd = new THREE.Quaternion();
const _qw = new THREE.Quaternion();
const _qp = new THREE.Quaternion();

/** Rotate `bone` (reset to rest first) by a world-space delta. */
function rotateWorld(bone: THREE.Bone, rest: THREE.Quaternion, delta: THREE.Quaternion) {
  bone.quaternion.copy(rest);
  bone.updateWorldMatrix(true, false);
  bone.getWorldQuaternion(_qw).premultiply(delta);
  bone.parent!.getWorldQuaternion(_qp).invert();
  bone.quaternion.copy(_qp.multiply(_qw));
}

/** Point `bone` (toward its `child`) along world direction `target`. */
function aimBone(bone: THREE.Bone, child: THREE.Object3D, rest: THREE.Quaternion, target: THREE.Vector3) {
  bone.quaternion.copy(rest);
  bone.updateWorldMatrix(true, true);
  bone.getWorldPosition(_p0);
  child.getWorldPosition(_p1);
  _dir.subVectors(_p1, _p0).normalize();
  _qd.setFromUnitVectors(_dir, target);
  rotateWorld(bone, rest, _qd);
}

/* --------------------------------- model --------------------------------- */
interface RobotProps {
  reducedMotion: boolean;
}

export default function Robot({ reducedMotion }: RobotProps) {
  const { scene, animations } = useGLTF(MODEL_URL);
  const width = useThree((s) => s.size.width);

  const floatRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(animations, modelRef);

  const rig = useMemo(() => buildRig(scene), [scene]);

  // Centre + normalise size so any model fits the same frame.
  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = ROBOT_HEIGHT / (size.y || 1);
    return { scale: s, offset: center.multiplyScalar(-s) };
  }, [scene]);

  // Eye blink targets (morph targets named *blink*, or emissive eye materials).
  const blink = useMemo(() => {
    const morphs: { mesh: THREE.Mesh; idx: number[] }[] = [];
    const eyes: { mat: THREE.MeshStandardMaterial; base: number }[] = [];
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const dict = m.morphTargetDictionary;
      if (dict) {
        const idx = Object.entries(dict).filter(([k]) => /blink/i.test(k)).map(([, v]) => v);
        if (idx.length) morphs.push({ mesh: m, idx });
      }
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mat) => {
        const std = mat as THREE.MeshStandardMaterial;
        if (/eye|glow|iris/i.test(`${mat.name} ${m.name}`) && std.emissive) {
          eyes.push({ mat: std, base: std.emissiveIntensity });
        }
      });
    });
    return { morphs, eyes };
  }, [scene]);

  const waveClip = names.find((n) => /wave|hello|greet/i.test(n));
  const idleClip =
    names.find((n) => /idle|breath|stand|rest/i.test(n) && n !== waveClip) ??
    names.find((n) => n !== waveClip);

  // Start the idle clip immediately (also the base layer under a wave clip).
  useEffect(() => {
    if (reducedMotion) return;
    const idle = idleClip ? actions[idleClip] : null;
    idle?.reset().fadeIn(0.5).play();
    if (!idle && waveClip) actions[waveClip]?.reset().play();
    return () => {
      Object.values(actions).forEach((a) => a?.fadeOut(0.2));
    };
  }, [actions, idleClip, waveClip, reducedMotion]);

  const wave = useRef(0); // eased 0..1 wave weight
  const clipWaving = useRef(false);
  const look = useRef({ x: 0, y: 0 });
  const nextBlink = useRef(3);
  const _e = useMemo(() => new THREE.Euler(), []);
  const _q = useMemo(() => new THREE.Quaternion(), []);
  const _qa = useMemo(() => new THREE.Quaternion(), []);
  const Z = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const motion = reducedMotion ? 0 : 1;

    /* 1 — floating + subtle whole-body drift */
    if (floatRef.current) {
      const g = floatRef.current;
      g.position.y = Math.sin(t * 1.1) * 0.09 * motion;
      g.rotation.y = Math.sin(t * 0.5) * 0.08 * motion;
      g.rotation.z = Math.sin(t * 0.7) * 0.015 * motion;
    }
    if (!motion) return;

    /* 2 — wave scheduler (idle <-> wave, smooth) */
    const phase = (t - WAVE_START) % WAVE_PERIOD;
    const wantWave = t >= WAVE_START && phase >= 0 && phase < WAVE_LENGTH;
    wave.current = THREE.MathUtils.damp(wave.current, wantWave ? 1 : 0, 3.2, delta);
    const w = wave.current;

    /* 3a — if the GLB ships its own wave clip, crossfade to it */
    if (waveClip && wantWave !== clipWaving.current) {
      clipWaving.current = wantWave;
      const wa = actions[waveClip];
      const ia = idleClip ? actions[idleClip] : null;
      if (wantWave) {
        wa?.reset().setEffectiveWeight(1).fadeIn(0.5).play();
        ia?.fadeOut(0.5);
      } else {
        ia?.reset().fadeIn(0.5).play();
        wa?.fadeOut(0.5);
      }
    }

    /* 3b — otherwise drive the real rig bones procedurally.
          Runs after the mixer (registered later), so it overrides arm bones only. */
    if (!rig) return;
    const { head, spine, arms, rest } = rig;

    if (spine) {
      _e.set(0, Math.sin(t * 0.6) * 0.04, Math.sin(t * 0.9) * 0.015, "YXZ");
      rotateWorld(spine, rest.get(spine)!, _q.setFromEuler(_e));
    }

    if (head) {
      look.current.x = THREE.MathUtils.damp(look.current.x, state.pointer.x * 0.35, 3, delta);
      look.current.y = THREE.MathUtils.damp(look.current.y, state.pointer.y * 0.2, 3, delta);
      _e.set(
        -look.current.y + Math.sin(t * 0.8) * 0.03,
        look.current.x + Math.sin(t * 0.55) * 0.08,
        Math.sin(t * 0.7) * 0.02,
        "YXZ",
      );
      rotateWorld(head, rest.get(head)!, _q.setFromEuler(_e));
    }

    if (!waveClip) {
      arms.forEach((arm, i) => {
        const isWaver = i === 0; // arm on the viewer's left, welcoming toward the text
        const aw = isWaver ? w : 0;
        const o = arm.outward;
        const breathe = Math.sin(t * 1.2 + i) * 0.03;

        _tgt.set(
          THREE.MathUtils.lerp(IDLE_UPPER.x, WAVE_UPPER.x, aw) * o + breathe,
          THREE.MathUtils.lerp(IDLE_UPPER.y, WAVE_UPPER.y, aw),
          THREE.MathUtils.lerp(IDLE_UPPER.z, WAVE_UPPER.z, aw),
        ).normalize();
        aimBone(arm.upper, arm.fore, rest.get(arm.upper)!, _tgt);

        if (arm.hand) {
          const sway = Math.sin(t * WAVE_SPEED) * 0.5 * aw;
          _tgt.set(
            (THREE.MathUtils.lerp(IDLE_FORE.x, WAVE_FORE.x, aw) + sway) * o,
            THREE.MathUtils.lerp(IDLE_FORE.y, WAVE_FORE.y, aw),
            THREE.MathUtils.lerp(IDLE_FORE.z, WAVE_FORE.z, aw),
          ).normalize();
          aimBone(arm.fore, arm.hand, rest.get(arm.fore)!, _tgt);

          if (aw > 0.001) {
            // wrist flick about the view axis
            _qa.setFromAxisAngle(Z, Math.sin(t * WAVE_SPEED + 0.8) * 0.45 * aw);
            rotateWorld(arm.hand, rest.get(arm.hand)!, _qa);
          }
        }
      });
    }

    /* 4 — blinking */
    if (t > nextBlink.current) nextBlink.current = t + 2.5 + Math.random() * 3;
    const bt = nextBlink.current - t; // counts down; blink in the last 0.14s
    const closed = bt > 0 && bt < 0.14 ? Math.sin((bt / 0.14) * Math.PI) : 0;
    blink.morphs.forEach(({ mesh, idx }) =>
      idx.forEach((i) => mesh.morphTargetInfluences && (mesh.morphTargetInfluences[i] = closed)),
    );
    blink.eyes.forEach(({ mat, base }) => (mat.emissiveIntensity = base * (1 - closed * 0.92)));
  });

  const x = width > 720 ? -0.7 : 0;

  return (
    <group position={[x, 0, 0]}>
      <group ref={floatRef}>
        <group ref={modelRef} scale={scale} position={offset}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
