export function getCartProductsCount(obj: Record<string, number>) {
  let sum = 0;

  for (const id in obj) {
    sum += obj[id];
  }

  return sum;
}
