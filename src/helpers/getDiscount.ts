export const getDiscount = (price: number, discount: number) => {
  return price - (price / 100) * discount;
};
