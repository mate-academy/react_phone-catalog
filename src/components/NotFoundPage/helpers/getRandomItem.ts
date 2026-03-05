export function getRandomItem<Item>(array: readonly Item[]): Item {
  return array[Math.floor(Math.random() * array.length)];
}
