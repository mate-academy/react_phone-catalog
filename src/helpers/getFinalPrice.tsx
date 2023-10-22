export const getFinalPrice = (price: number, discount: number) => {
  const discountAmount = discount ? discount / 100 : 1;

  return discountAmount === 1
    ? price
    : Math.round(price - price * discountAmount);
};
