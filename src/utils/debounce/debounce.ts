// type Callback = (arg: string) => any;

// export function debounce(callback: Callback, delay = 1000) {
//   let timeout: ReturnType<typeof setTimeout>;

//   return (arg: string) => {
//     clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       callback(arg);
//     }, delay);
//   };
// }

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number,
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> => new Promise((resolve) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      resolve(fn(args));
    }, ms);
  });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}
