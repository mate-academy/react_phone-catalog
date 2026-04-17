export const scrollToPosition = (target: number, duration = 400) => {
  const start = window.scrollY;
  const distance = target - start;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const easedProgress = easeInOut(progress);
    const currentScroll = start + distance * easedProgress;

    window.scrollTo(0, currentScroll);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

export const goTo = () => scrollToPosition(0, 500);

export const goBottom = () => {
  const fullHeight = document.documentElement.scrollHeight;

  scrollToPosition(fullHeight, 1000);
};
