export const makeAlt = (param: string) => {
  const startIndex = param.split('').lastIndexOf('/') + 1;
  const lastIndex = param.split('').lastIndexOf('-');

  return param.slice(startIndex, lastIndex);
};
