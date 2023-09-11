type Product = {
  price: number;
  discount: number;
};

export const calculateDiscount = (product: Product) => {
  const { price, discount } = product;

  return price - ((price / 100) * discount);
};
