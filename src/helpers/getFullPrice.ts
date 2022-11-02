export const getFullPrice = (price: number, discount: number) => {
  if (!discount) {
    return price;
  }

  return price - (price * (discount / 100));
};
