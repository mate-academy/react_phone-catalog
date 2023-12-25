/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  let timerId = 0;

  return (...args: any[]) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
