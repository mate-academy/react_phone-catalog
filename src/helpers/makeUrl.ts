export const makeUrl = (param: string) => {
  let result = '';
  const normalizedParam = param.toLowerCase();

  for (let index = 0; index < normalizedParam.length; index += 1) {
    if (normalizedParam[index] === ' ') {
      result += normalizedParam[index + 1].toUpperCase()
      + normalizedParam.slice(index + 2);

      return result;
    }

    result += normalizedParam[index].toLowerCase();
  }

  return result;
};
