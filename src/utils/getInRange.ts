export const getInRange = (target: number, min: number, max: number) => {
  return Math.max(Math.min(max, target), min);
};
