import { CategoriesEnum } from '../../../../entities/Categories';
import { Product } from '../../../../entities/Product';

export const getSuggestedProducts = async (
  categoty: CategoriesEnum,
): Promise<Product[]> => {
  try {
    const response = await fetch(`api/products.json`)
      .then(res => res.json())
      .then((products: Product[]) =>
        products.filter(product => product.category === categoty),
      );

    return response.slice(0, 10);
  } catch (e) {
    throw new Error('error');
  }
};
