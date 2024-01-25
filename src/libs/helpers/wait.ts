export const wait = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};
