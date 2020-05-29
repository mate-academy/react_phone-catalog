function debounce<Params extends any[]>(
  f: (...args: Params) => any,
  delay: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout;

  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f(...args);
    }, delay);
  };
}

export default debounce;
