export const useCamelCase = (s: string | string[] | undefined) => {
  if (!s) {
    return undefined;
  }

  if (!Array.isArray(s)) {
    return s.slice(0, 1).toUpperCase() + s.slice(1);
  }

  const arrS = s.filter(el => !!el)
    .map(el => el.slice(0, 1).toUpperCase() + el.slice(1));

  return arrS.join(' ');
};
