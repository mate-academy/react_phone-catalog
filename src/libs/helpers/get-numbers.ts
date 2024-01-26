export const getNumbers = (count: number): number[] => {
  return [...Array(count)].map((_, i) => i + 1);
};
