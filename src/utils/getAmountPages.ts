export const getAmountPages = (total: number) => {
  const result = [];

  for (let i = 1; i <= total; i++) {
    result.push(i);
  }

  return result;
};
