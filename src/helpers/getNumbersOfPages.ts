export const getNumbersOfPages = (from:number, to:number) => {
  const numbers = [];

  for (let i = from; i <= to; i += 1) {
    numbers.push(i);
  }

  return numbers;
};
