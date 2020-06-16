export const setPriceWithDiscount = (product: Product) => (
  product.price - product.price * (product.discount / 100)
);
