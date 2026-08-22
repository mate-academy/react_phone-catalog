export function getNumbers(from: number, to: number): number[] {
  const result = [];

  for (let n = from; n <= to; n += 1) {
    result.push(n);
  }

  return result;
}
