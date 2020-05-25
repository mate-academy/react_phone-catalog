export const debounce = (f: (value: string) => void, delay: number) => {
  let timerId: number;

  return (...args: any) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(f, delay, ...args);
  };
};
