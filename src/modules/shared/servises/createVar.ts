import phonesData from '../../../../public/api/phones.json';
import tabletsData from '../../../../public/api/tablets.json';
import accessoriesData from '../../../../public/api/accessories.json';
import type { ProductDetails } from '../types/ProductDetails';
import { productsColorsHex } from '../variables';

export const getSequence = (num: number): string[] => {
  const result: string[] = [];
  const maxNum = num;

  for (let n = 0; n <= maxNum; n++) {
    result.push((n + 1).toString());
  }

  return result;
};

export const getAvalibleColors = (
  data: ProductDetails[],
  dataHex: Record<string, string>,
) => {
  const result: string[] = [];
  const colors: Record<string, string> = dataHex;

  data.forEach((item: ProductDetails) => {
    result.push(...item.colorsAvailable);
  });

  const uniqueColors = [...new Set(result)];

  const avalibleColors = uniqueColors.reduce(
    (acc: Record<string, string>, color: string) => {
      return {
        ...acc,
        [color]: colors[color],
      };
    },
    {},
  );

  return avalibleColors;
};

export const getCurrentColors = (productCategory?: string) => {
  if (!productCategory) {
    return {};
  }

  let data: Record<string, string>;

  switch (productCategory) {
    case 'phones':
      data = getAvalibleColors(phonesData, productsColorsHex);
      break;

    case 'tablets':
      data = getAvalibleColors(tabletsData, productsColorsHex);
      break;

    case 'accessories':
      data = getAvalibleColors(accessoriesData, productsColorsHex);
      break;

    default:
      data = {};
      break;
  }

  return data;
};
