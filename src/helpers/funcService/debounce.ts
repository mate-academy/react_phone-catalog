/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(callback: (...args: any) => void, delay: number) {
  let timerId = 0;

  return (...args: any) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
