// use this when you filtering products by URLSearchParams,
// to get enum value from string

export function getEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: string | null,
): T[keyof T] | undefined {
  const values = Object.values(enumObj) as string[];

  return value && values.includes(value) ? (value as T[keyof T]) : undefined;
}
