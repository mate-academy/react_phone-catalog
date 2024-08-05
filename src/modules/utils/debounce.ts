// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (fn: any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
