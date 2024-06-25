export const getRandomNumbers = (
  n: number,
  min: number,
  max: number,
): number[] => {
  const expectedLength = max - min;

  if (expectedLength < n) {
    return Array.from(Array(expectedLength), (_, i) => min + i);
  }

  const numbers = new Set<number>();

  while (numbers.size < n) {
    const randomNumber = min + Math.floor(Math.random() * expectedLength);

    numbers.add(randomNumber);
  }

  return Array.from(numbers);
};
