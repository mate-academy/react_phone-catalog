import { ParamType } from '../types/ParamType';

export const getNewParams = (
  prevParam: string,
  newParam: string,
  type: ParamType,
) => {
  const array = prevParam.split('-');

  switch (type) {
    case 'color':
      array[array.length - 1] = newParam;
      break;
    case 'capacity':
      array[array.length - 2] = newParam.toLowerCase();
      break;
    default:
      break;
  }

  return array.join('-');
};
