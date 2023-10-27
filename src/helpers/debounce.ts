export const debounce = (
  callback: (
    oldSerchParams: URLSearchParams,
    newQuery: string
  ) => void, delay: number,
) => {
  let timerId = 0;

  return (oldSerchParams: URLSearchParams, newQuery: string) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(
      () => callback(oldSerchParams, newQuery),
      delay,
    );
  };
};
