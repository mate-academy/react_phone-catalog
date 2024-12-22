// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(callback: Function, delay: number) {
  let timerId = 0;

  return (args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(callback, delay, args);
  };
}
