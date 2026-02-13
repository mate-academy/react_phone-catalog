export const getWholeRandom = (max: number, min: number) => {
  return Math.round(Math.random() * (max - min + 1) + min);
};
