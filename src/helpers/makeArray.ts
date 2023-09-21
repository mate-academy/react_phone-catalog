export const makeArray = (param: number) => {
  const result = [];

  for (let index = 0; index < param; index += 1) {
    result.push(index);
  }

  return result;
};
