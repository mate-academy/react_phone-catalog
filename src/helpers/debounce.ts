/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(
  fn: (...args: any[]) => any,
  ms: number,
) {
  let timer: NodeJS.Timeout;

  return function wrapper(this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
