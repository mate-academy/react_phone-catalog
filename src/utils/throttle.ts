/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = <A = unknown, R = void>(
  fn: (args: A) => R,
  wait: number,
) => {
  let inThrottle: boolean;
  let lastFn: ReturnType<typeof setTimeout>;
  let lastTime: number;

  return (...args: any) => {
    if (!inThrottle) {
      fn(args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn(args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
