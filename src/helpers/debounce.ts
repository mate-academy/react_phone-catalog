let timerId: ReturnType<typeof setTimeout>;

export const debounce = (f: (value: string) => void, delay: number) => {
  return (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => f(value), delay);
  };
};
