export const getRandomInteger = (
  min: number,
  max: number,
  amount: number,
): number[] => {
  const result: number[] = [];

  for (let i = min; i <= amount; i++) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!result.includes(random)) {
      result.push(random);
    }
  }

  return result;
};
