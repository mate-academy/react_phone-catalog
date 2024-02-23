export const getKeyByValue
= <T extends Record<string, string>>(options: T[], value: string) => {
  const option = options.find((obj) => obj.value === value);

  return option?.label;
};
