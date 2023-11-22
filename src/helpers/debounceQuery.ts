/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounceQuery = (
  callBack: (...args: any[]) => void,
  delay: number,
) => {
  let timerId = 0;

  return (...args: any[]) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callBack(...args);
    }, delay);
  };
};
