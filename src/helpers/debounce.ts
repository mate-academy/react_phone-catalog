export const debounce = (
  callback: (newQuery: string) => void, delay: number,
) => {
  let timerId = 0;

  return (args: string) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => callback(args), delay);
  };
};
