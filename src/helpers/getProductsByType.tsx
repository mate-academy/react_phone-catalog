import { Product } from '../types/Product';
import { TypeOfProduct } from '../types/TypeOfProduct';

export const getProductsByType = (
  products: Product[],
  filter: string,
) => (
  products.filter(({ category }) => {
    switch (filter) {
      case TypeOfProduct.Phones:
        return category === 'phones';

      case TypeOfProduct.Tablets:
        return category === 'tablets';

      case TypeOfProduct.Accessories:
        return category === 'accessories';

      default:
        return 0;
    }
  })
);
