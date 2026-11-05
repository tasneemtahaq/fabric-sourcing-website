"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/** If the 3D scene throws, keep the page alive (the poster image stays) and log why. */
export default class CubeErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Cube] 3D scene crashed:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}