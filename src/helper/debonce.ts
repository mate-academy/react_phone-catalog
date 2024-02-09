export const debounce = (
  call: (...args: any[]) => void, delay: number,
) => {
  let timerId = 0;

  return (...args: any[]) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      call(...args);
    }, delay);
  };
};
