/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { ProductGeneral } from '../types/ProductGeneral';
import { ErrorText } from '../constants/errorText';
import { dots } from '../constants/dots';

export function getNumberOfItems(width: number) {
  if (width < 640) {
    return 2;
  }

  if (width < 1200) {
    return 3;
  }

  return 4;
}

export function isProductGeneralType(obj: any): obj is ProductGeneral {
  return (
    typeof obj.id === 'number' &&
    typeof obj.fullPrice == 'number' &&
    typeof obj.priceRegular === undefined
  );
}

export const getButtonSecondaryClass = (darkTheme: boolean) =>
  classNames(`button button--secondary`, {
    'button--secondary-darkTheme': darkTheme,
  });

export const getButtonMainClass = (darkTheme: boolean) =>
  classNames(`button button--main`, {
    'button--main-darkTheme': darkTheme,
  });

export const getCatagoryNameANDError = (category: string) => {
  switch (category) {
    case 'tablets':
      return { name: 'Tablets', errorText: ErrorText.noTablets };
    case 'phones':
      return { name: 'Mobile phones', errorText: ErrorText.noPhones };
    default:
    case 'accessories':
      return { name: 'Accessories', errorText: ErrorText.noAccessories };
  }
};

export const getButtonValue = (
  value: string | number,
  index: number,
  visibleButtons: (string | number)[],
  selectedPage: number,
) => {
  const previousValue = visibleButtons[index - 1];
  const nextValue = visibleButtons[index + 1];

  if (typeof value === 'number') {
    return value;
  }

  switch (value) {
    case dots.start:
      return +previousValue + 1;

    case dots.end:
      return +nextValue - 1;

    default:
      return selectedPage;
  }
};
