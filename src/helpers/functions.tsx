// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<T>(callback: (args: T) => void, delay: number) {
  let timerId: NodeJS.Timeout;

  return (args: T) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(args), delay);
  };
}
