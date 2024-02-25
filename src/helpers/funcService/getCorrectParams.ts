import { ParamType } from '../types/ParamType';

export const getCorrectParam = (
  oldParam: string,
  newParam: string,
  type: ParamType,
) => {
  const array = oldParam.split('-');

  switch (type) {
    case ParamType.COLOR:
      array[array.length - 1] = newParam;
      break;
    case ParamType.CAPACITY:
      array[array.length - 2] = newParam.toLowerCase();
      break;
    default:
      break;
  }

  return array.join('-');
};
