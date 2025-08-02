export function generateDeviceModel(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getLetter = (n: number) => letters[n % 26];
  const getDigit = (n: number) => (n % 10).toString();

  const l1 = getLetter(hash >> 0);
  const l2 = getLetter(hash >> 5);
  const d1 = getDigit(hash >> 10);
  const d2 = getDigit(hash >> 15);
  const d3 = getDigit(hash >> 20);
  const l3 = getLetter(hash >> 3);
  const l4 = getLetter(hash >> 8);

  return `i${l1}${l2}${d1}${d2}${d3}${l3}${l4}/A`;
}
