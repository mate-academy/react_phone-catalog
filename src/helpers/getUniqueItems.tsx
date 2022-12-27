export function getUniqueItems<T>(
  array: T[],
  getKey: (item: T) => string | number,
) {
  const seenItems: Record<string, boolean> = {};

  return array.filter((item) => {
    const key = getKey(item);

    if (seenItems[key]) {
      return false;
    }

    seenItems[key] = true;

    return true;
  });
}
