export const useCamelCase = (s: string | undefined) => {
  if (!s) {
    return undefined;
  }

  return s.slice(0, 1).toUpperCase() + s.slice(1);
};
