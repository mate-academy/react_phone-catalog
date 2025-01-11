export const getRandomNumbers = (min: number, max: number, count: number) => {
  const numbers: Set<number> = new Set();

  while (numbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    numbers.add(randomNumber);
  }

  return Array.from(numbers);
};
