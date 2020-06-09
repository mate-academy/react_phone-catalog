export const debounce = (f: (value: string) => void, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      f(value);
    }, delay);
  };
};
