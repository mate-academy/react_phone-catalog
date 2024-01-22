export const isInclude = (enumType: object, value: string) => {
  return Object.values(enumType).includes(value);
};
