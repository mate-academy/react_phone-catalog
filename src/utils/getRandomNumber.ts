export function getRandomNumber() {
  return [...Array(6)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}
