import { Product } from "../types/Product";

export const getHotPriceProducts = (products: Product[]): Product[] => {
  const filteredProducts = products.filter(product => {
    return product.discount > 0;
  });

  const productsWithAbsDiscount = filteredProducts.map(product => {
    return {
      ...product,
      discountValue: product.price / 100 * product.discount
    }
  })

  const sortedProducts = productsWithAbsDiscount.sort((prodcut1, prodcut2) => {
    return prodcut2.discountValue - prodcut1.discountValue;
  })

  return sortedProducts;
}
