/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<T extends(...args: any[]) => void>(
  callback: T,
  delay: number) {
  let timerId = 0;

  return (...args: Parameters<T>) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
