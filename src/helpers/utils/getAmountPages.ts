export function getAmountPages(amount: number) {
  const array = [];

  for (let i = 1; i <= amount; i += 1) {
    array.push(i);
  }

  return array;
}
