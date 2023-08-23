export const makeAlt = (param: string) => {
  const startIndex = param.split('').lastIndexOf('/');
  const lastIndex = param.split('').lastIndexOf('-');

  return param.slice(startIndex, lastIndex);
};
