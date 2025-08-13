class AFLoop {
  private rafId: number | null = null;

  private fn: () => void;

  constructor(fn: () => void) {
    this.fn = fn;
  }

  start = () => {
    if (this.rafId !== null) {
      return;
    }

    const loop = () => {
      this.fn();
      this.rafId = requestAnimationFrame(loop);
    };

    loop();
  };

  stop = () => {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  };
}

export { AFLoop };
