export const wait = (delay: number) => {
  return new Promise(resolve => {
    window.setTimeout(resolve, delay);
  });
};
