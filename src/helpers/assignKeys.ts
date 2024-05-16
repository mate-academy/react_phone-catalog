type AssignKeys = <T extends Record<string, unknown>>(
  arr: T[],
) => (T & { key: number })[];

export const assignKeys: AssignKeys = arr =>
  arr.map((item, index) => ({ ...item, key: index }));
