export function findISelectedItem<T extends { name: string }>(
  items: T[],
  name: string = '',
): T | undefined {
  if (name) {
    return items.find(i => i.name === name);
  } else {
    return;
  }
}
