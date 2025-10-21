const debounce = (fn: () => void, interval: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => fn(), interval);
  };
};

export default debounce;
