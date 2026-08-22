export function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  let timerId: number | null = null;

  return (...args: Args) => {
    if (timerId) {
      window.clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
