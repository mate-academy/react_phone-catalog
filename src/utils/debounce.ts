const debounce = (fn: () => void, interval: number) => {
  let timer: number;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => fn(), interval);
  };
};

export default debounce;
