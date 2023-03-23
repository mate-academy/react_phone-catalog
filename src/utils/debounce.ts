export const debounce = (
  f: (...args: string[]) => void,
  delay: number | undefined,
) => {
  let timerId: NodeJS.Timeout;

  return (...args: string[]) => {
    clearTimeout(timerId);

    timerId = setTimeout(f, delay, ...args);
  };
};
