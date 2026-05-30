export const getNumbers = (start: number, end: number): number[] => {
  const numbers = [];

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
};
