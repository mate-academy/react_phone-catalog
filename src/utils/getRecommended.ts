import { Product } from '../types/Product';
import { ProductGeneral } from '../types/ProductGeneral';

export const getRecomended = (
  products: ProductGeneral[],
  selectedProduct: Product,
  category: string,
) => {
  const similarProducts = products.filter(
    (item, index) =>
      item.itemId.includes(selectedProduct.namespaceId) && index % 3 === 0,
  );
  const randomProducts = products
    .filter((item, index) => item.category !== category && index % 3 === 0)
    .sort((item1, item2) => item2.fullPrice - item1.fullPrice)
    .slice(0, 10);

  return [...similarProducts, ...randomProducts].sort(
    (item1, item2) => item2.fullPrice - item1.fullPrice,
  );
};
