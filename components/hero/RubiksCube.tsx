"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

/* ---------------------------- tuning ---------------------------- */
const OFFS = [-1.5, -0.5, 0.5, 1.5]; // 4×4×4 grid
const STEP = 1.06; // spacing between cubelets
const SIZE = 0.94; // cubelet edge length
const CUBE_W = 6.0; // approx. projected width of the assembled cube (isometric)
const T0 = 0.6; // intro starts (seconds after canvas is created)
const DUR = 2.2; // flight time of each cubelet
const MAX_DELAY = 0.9; // random stagger between cubelets
const TWIST_EVERY = 2.4; // seconds between layer turns
const TWIST_TIME = 0.9; // seconds per 90° turn
const PALETTE = ["#22e5d0", "#3b82ff", "#7c3aed", "#ec4899", "#fbbf24"].map(
  (c) => new THREE.Color(c),
); // cyan → blue → violet → pink → amber (from your reference image)
const FROST = new THREE.Color("#e4e8ff");

const AXES = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const snap = (v: number) => Math.round(v - 0.5) + 0.5; // snap to -1.5,-0.5,0.5,1.5

/**
 * Scroll timeline (0 → 1):
 * 0.03–0.16 cube glides to the centre & shrinks · 0.2–0.6 cards hold (reading time)
 * 0.6–0.71 cards are absorbed into the cube · 0.69–0.85 cube bursts · 0.9–1 reassembles
 */
export const shrinkCurve = (p: number) => smooth(0.03, 0.16, p) * (1 - smooth(0.68, 0.8, p));
/** Scroll → cube scatters into floating cubes, then reassembles. */
export const explodeCurve = (p: number) => smooth(0.69, 0.85, p) * (1 - smooth(0.9, 1, p));

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function palette(t: number, out: THREE.Color) {
  const x = clamp01(t) * (PALETTE.length - 1);
  const i = Math.min(Math.floor(x), PALETTE.length - 2);
  return out.copy(PALETTE[i]).lerp(PALETTE[i + 1], x - i);
}

interface Cubelet {
  home: THREE.Vector3;
  color: THREE.Color;
  edge: THREE.Color;
  frost: boolean;
  delay: number; // intro stagger
  start: THREE.Vector3; // where it flies in from
  startScale: number;
  dir: THREE.Vector3; // scroll-scatter direction
  spread: number;
  spin: THREE.Quaternion;
  endScale: number;
}
interface Twist {
  axis: 0 | 1 | 2;
  layer: number;
  dir: 1 | -1;
  t: number;
}

const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _qa = new THREE.Quaternion();

interface Props {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  /** Empty space between the title and the copy on phones; the cube sits inside it. */
  slotRef?: RefObject<HTMLElement | null>;
}

export default function RubiksCube({ progress, reducedMotion, slotRef }: Props) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const viewW = useThree((s) => s.viewport.width);
  const viewH = useThree((s) => s.viewport.height);
  const groupRef = useRef<THREE.Group>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMesh = useRef<THREE.Mesh>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const twist = useRef<Twist | null>(null);
  const nextTwist = useRef(T0 + DUR + MAX_DELAY + 1.2);
  const slot = useRef({ cy: 0, h: 0 }); // phone slot, in canvas pixels
  const smoothed = useRef({ fit: 0, y: 0 }); // eased size/position so layout changes glide

  const boxGeo = useMemo(() => new THREE.BoxGeometry(SIZE, SIZE, SIZE), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  const cubelets = useMemo<Cubelet[]>(() => {
    const r = rng(11);
    const list: Cubelet[] = [];
    const range = 2.325;
    for (const x of OFFS)
      for (const y of OFFS)
        for (const z of OFFS) {
          const frost = r() < 0.22;
          const t = (x * 0.5 - y * 0.7 + z * 0.35 + range) / (2 * range); // top cyan → bottom pink/amber
          const color = frost ? FROST.clone() : palette(t, new THREE.Color());
          const home = new THREE.Vector3(x, y, z);
          const dir = home
            .clone()
            .normalize()
            .add(new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.1))
            .normalize();
          list.push({
            home,
            color,
            edge: color.clone().lerp(new THREE.Color("#ffffff"), 0.55),
            frost,
            delay: r() * MAX_DELAY,
            start: new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5)
              .normalize()
              .multiplyScalar(14 + r() * 14),
            startScale: 0.4 + r() * 1.2,
            dir,
            spread: 2.5 + r() * 5,
            spin: new THREE.Quaternion().setFromEuler(new THREE.Euler(r() * 6, r() * 6, r() * 6)),
            endScale: 0.3 + r() * 1.1,
          });
        }
    return list;
  }, []);

  // committed grid state (changes only when a layer turn finishes)
  const pos = useRef<THREE.Vector3[]>(cubelets.map((c) => c.home.clone()));
  const quat = useRef<THREE.Quaternion[]>(cubelets.map(() => new THREE.Quaternion()));

  // neon floor glow, like the reference image
  const glowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, "rgba(255,90,220,0.95)");
    grd.addColorStop(0.35, "rgba(140,70,255,0.45)");
    grd.addColorStop(1, "rgba(40,40,200,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const off = progress.on("change", () => invalidate()); // redraw on scroll in demand mode
    return () => {
      window.removeEventListener("pointermove", onMove);
      off();
    };
  }, [progress, invalidate]);

  // Measure the phone slot (re-measured whenever the layout or screen size changes)
  useEffect(() => {
    const el = slotRef?.current;
    if (!el) return;
    const measure = () => {
      const a = el.getBoundingClientRect();
      const b = gl.domElement.getBoundingClientRect();
      slot.current = { cy: a.top + a.height / 2 - b.top, h: a.height };
      invalidate();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(gl.domElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [slotRef, gl, invalidate]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progress.get();
    const e = explodeCurve(p);
    const sh = shrinkCurve(p);

    /* start a Rubik's layer turn once assembled and idle */
    if (!reducedMotion && e < 0.01 && sh < 0.05 && !twist.current && t > nextTwist.current) {
      twist.current = {
        axis: Math.floor(Math.random() * 3) as 0 | 1 | 2,
        layer: OFFS[Math.floor(Math.random() * OFFS.length)],
        dir: Math.random() < 0.5 ? 1 : -1,
        t: 0,
      };
    }

    const tw = twist.current;
    let angle = 0;
    if (tw) {
      tw.t += delta / TWIST_TIME;
      angle = easeInOut(clamp01(tw.t)) * tw.dir * (Math.PI / 2);
    }

    cubelets.forEach((c, i) => {
      const m = meshes.current[i];
      if (!m) return;
      _p.copy(pos.current[i]);
      _q.copy(quat.current[i]);

      if (tw && Math.abs(_p.getComponent(tw.axis) - tw.layer) < 0.25) {
        _p.applyAxisAngle(AXES[tw.axis], angle);
        _q.premultiply(_qa.setFromAxisAngle(AXES[tw.axis], angle));
      }

      _p.multiplyScalar(STEP);

      // intro: each cubelet flies in from far away, tumbling, and settles
      const li = reducedMotion ? 1 : clamp01((t - T0 - c.delay) / DUR);
      const ik = Math.pow(1 - li, 3);
      let k = 0;
      let s = 1;
      if (ik > 0.0005) {
        _p.addScaledVector(c.start, ik);
        k = ik;
        s = THREE.MathUtils.lerp(1, c.startScale, ik);
      }

      // scroll: scatter into floating cubes
      if (e > 0.0005) {
        _p.multiplyScalar(1 + e * 1.2).addScaledVector(c.dir, e * c.spread);
        _p.y += Math.sin(t * 0.8 + i) * 0.15 * e;
        k = Math.max(k, e);
        s = THREE.MathUtils.lerp(s, c.endScale, e);
      }
      if (k > 0) _q.slerp(c.spin, k);

      m.position.copy(_p);
      m.quaternion.copy(_q);
      m.scale.setScalar(s);
    });

    /* commit a finished turn to the grid */
    if (tw && tw.t >= 1) {
      cubelets.forEach((_, i) => {
        const pp = pos.current[i];
        if (Math.abs(pp.getComponent(tw.axis) - tw.layer) < 0.25) {
          pp.applyAxisAngle(AXES[tw.axis], tw.dir * (Math.PI / 2));
          pp.set(snap(pp.x), snap(pp.y), snap(pp.z));
          quat.current[i].premultiply(_qa.setFromAxisAngle(AXES[tw.axis], tw.dir * (Math.PI / 2)));
        }
      });
      twist.current = null;
      nextTwist.current = t + TWIST_EVERY;
    }

    /* whole cube: tumble during intro, isometric pose, spin, parallax, float, scroll shrink */
    const g = groupRef.current;
    if (g) {
      const pt = pointer.current;
      pt.sx = THREE.MathUtils.damp(pt.sx, pt.x, 3, delta);
      pt.sy = THREE.MathUtils.damp(pt.sy, pt.y, 3, delta);
      const motion = reducedMotion ? 0.35 : 1;
      const lg = reducedMotion ? 1 : clamp01((t - T0) / (DUR + MAX_DELAY));
      const ig = Math.pow(1 - lg, 3);

      g.rotation.x = 0.615 + ig * 0.5 + pt.sy * 0.14 * motion;
      g.rotation.y = Math.PI / 4 + ig * 2.6 + t * 0.16 * motion + pt.sx * 0.35 * motion + e * 1.1;

      const desktop = width >= 1024;
      // desktop: sits on the right-middle.
      // phones/tablets: sized and placed inside the empty slot between the title and the copy,
      // so it never sits on top of the heading.
      let fit: number;
      let homeY = 0;
      const sl = slot.current;
      if (desktop) {
        fit = Math.min(0.56, (0.34 * viewW) / CUBE_W);
      } else if (sl.h > 0) {
        const pxToWorld = viewH / height;
        fit = Math.min(0.5, (0.62 * viewW) / CUBE_W, (sl.h * pxToWorld * 0.88) / 6.9);
        homeY = (height / 2 - sl.cy) * pxToWorld;
      } else {
        fit = Math.min(0.5, (0.6 * viewW) / CUBE_W, (0.3 * viewH) / 6.9);
      }
      const sm = smoothed.current;
      if (sm.fit === 0 || reducedMotion) {
        sm.fit = fit;
        sm.y = homeY;
      } else {
        sm.fit = THREE.MathUtils.damp(sm.fit, fit, 5, delta);
        sm.y = THREE.MathUtils.damp(sm.y, homeY, 5, delta);
      }

      g.scale.setScalar(sm.fit * (1 - 0.38 * sh));
      // scrolling glides it to the centre (behind the middle card)
      const homeX = desktop ? viewW * 0.25 : 0;
      g.position.x = THREE.MathUtils.lerp(homeX, 0, sh);
      g.position.y = THREE.MathUtils.lerp(sm.y, 0.1, sh) + Math.sin(t * 1.1) * 0.1 * motion;
      if (glowMesh.current) {
        const k = sm.fit / 0.56; // floor glow follows the cube's size and height
        glowMesh.current.position.set(g.position.x, g.position.y - 2.5 * k, 0);
        glowMesh.current.scale.setScalar(k);
      }
    }
    if (glowMat.current) glowMat.current.opacity = (1 - e * 0.65) * (1 - sh * 0.5);
  });

  return (
    <>
      <mesh ref={glowMesh} rotation-x={-Math.PI / 2} position={[0, -2.5, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          ref={glowMat}
          map={glowTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <group ref={groupRef} scale={0.5}>
        {cubelets.map((c, i) => (
          <mesh
            key={i}
            ref={(m) => {
              meshes.current[i] = m;
            }}
            geometry={boxGeo}
            position={[100, 100, 100]}
          >
            <meshPhysicalMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={c.frost ? 0.12 : 0.3}
              roughness={c.frost ? 0.35 : 0.12}
              metalness={0.05}
              clearcoat={1}
              clearcoatRoughness={0.1}
              iridescence={1}
              iridescenceIOR={1.5}
              transparent
              opacity={c.frost ? 0.8 : 0.55}
              depthWrite={false}
              envMapIntensity={1.4}
            />
            <lineSegments geometry={edgesGeo}>
              <lineBasicMaterial color={c.edge} transparent opacity={0.95} toneMapped={false} />
            </lineSegments>
          </mesh>
        ))}
      </group>
    </>
  );
}