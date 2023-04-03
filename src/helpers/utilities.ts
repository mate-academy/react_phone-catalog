export const isSortBy = <E extends string> (
  value: E,
  strEnum: Record<string, E>,
) => {
  const enumValues = Object.values(strEnum) as string[];

  return enumValues.includes(value);
};

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}
