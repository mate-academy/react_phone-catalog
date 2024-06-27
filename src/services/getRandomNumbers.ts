export function getRandomNumbers(
  start: number,
  end: number,
  amount: number,
  exclude: number[],
): number[] {
  const randomNumbers: number[] = [];
  const lengthAvaliable = end - start;
  let quantity = amount;

  if (amount > lengthAvaliable - exclude.length) {
    quantity = lengthAvaliable - exclude.length;
  }

  while (randomNumbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * (end - start) + start);

    if (
      !randomNumbers.includes(randomNumber) &&
      !exclude.includes(randomNumber)
    ) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}
