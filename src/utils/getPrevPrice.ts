export const getPrevPrice = (price: number, discount: number) => {
  if (discount === 0) {
    return price;
  }

  return price + (price / 100) * discount;
};
