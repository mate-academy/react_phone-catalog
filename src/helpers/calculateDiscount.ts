type Product = {
  price: number,
  fullPrice: number,
};

export const calculateDiscount = (product: Product) => {
  const { price, fullPrice } = product;

  return Math.round(((fullPrice - price) / fullPrice) * 100);
};
