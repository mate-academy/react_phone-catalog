export const getPriceWithDiscount = (price: number, discount = 0) => {
  return price - ((price * discount) / 100);
};
