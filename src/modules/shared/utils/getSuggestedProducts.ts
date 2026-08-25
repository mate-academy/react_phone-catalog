export function getSuggestedProducts<T extends { id: number }>(
  products: T[],
  currentProductId: number,
  count = 10,
): T[] {
  const filtered = products.filter(p => p.id !== currentProductId);

  const shuffled = [...filtered];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
