import { CategoriesEnum } from '../../../../entities/Categories';
import { ProductDetails } from '../types/productDetails';

export const fetchProducts = async (
  categoty: CategoriesEnum,
  itemId: string,
): Promise<ProductDetails | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/${categoty}.json`)
      .then(res => res.json())
      .then((products: ProductDetails[]) =>
        products.find(product => product.id === itemId),
      );

    return response ? response : null;
  } catch (e) {
    throw new Error('error');
  }
};
