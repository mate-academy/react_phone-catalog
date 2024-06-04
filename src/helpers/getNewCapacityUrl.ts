import { ProductOptions } from './productOptions';

export const getNewCapacityUrl = (currentUrl: string, newValue: string) => {
  const groupedUrl = currentUrl.split('-');

  // Replace the old value with the new value
  const newUrlArray = groupedUrl.map((stringGroup: string) => {
    if (
      stringGroup.includes(ProductOptions.Tb) ||
      stringGroup.includes(ProductOptions.Gb) ||
      stringGroup.includes(ProductOptions.mm)
    ) {
      return newValue.toLocaleLowerCase();
    } else {
      return stringGroup;
    }
  });

  // Return full (joined) URL
  return '/product/' + newUrlArray.join('-');
};
