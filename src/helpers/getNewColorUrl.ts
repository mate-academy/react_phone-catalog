import { ProductOptions } from './productOptions';

export const getNewColorUrl = (currentUrl: string, newColor: string) => {
  const groupedUrl = currentUrl.split('-');

  // Declare the variable and set a fallback value
  let capacityIndex = groupedUrl.length - 2;

  for (let i = 0; i < groupedUrl.length - 1; i++) {
    const currentGroup = groupedUrl[0];

    if (
      currentGroup.includes(ProductOptions.Tb) ||
      currentGroup.includes(ProductOptions.Gb) ||
      currentGroup.includes(ProductOptions.mm)
    ) {
      capacityIndex = i;
    }
  }

  // Cut the old color
  const newUrlArray = groupedUrl.slice(0, capacityIndex + 1);

  // Push the new color
  newUrlArray.push(newColor);

  // Return full (joined) URL
  return '/product/' + newUrlArray.join('-');
};
