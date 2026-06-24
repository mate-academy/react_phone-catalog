/**
 * Generate array of numbers from start to end (inclusive)
 * @example getNumbers(1, 5) → [1, 2, 3, 4, 5]
 */
export function getNumbers(start: number, end: number): number[] {
  const result: number[] = [];

  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }

  return result;
}
