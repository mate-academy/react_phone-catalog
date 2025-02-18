export const hasDiscount = (productName: string) =>
  !productName.includes('iPhone 14') &&
  !productName.includes('6th Gen') &&
  !productName.includes('Series 6');
