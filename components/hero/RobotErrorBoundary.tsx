"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  failed: boolean;
}

/** Catches GLB load failures so the rest of the hero keeps working. */
export default class RobotErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Robot] failed to load /models/robot.glb:", error);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-sky-100/70">
          3D model not found. Add it at public/models/robot.glb
        </div>
      );
    }
    return this.props.children;
  }
}
