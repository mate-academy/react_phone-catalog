export function getRandomNumber(min: number, max: number) {
  const randomFloat = Math.random();

  const randomNumber = Math.floor(randomFloat * (max - min)) + min;

  return randomNumber;
}
