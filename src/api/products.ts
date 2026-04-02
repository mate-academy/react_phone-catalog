import { CategoryTypes, PathType, Product, Products } from '../types/Types';
import { getData } from './data';

export const getProducts = async () => {
  const allProducts = await getData<Products>(`${PathType.PRODUCTS}.json`);

  return allProducts;
};

export const getCategoryProducts = async (
  category: CategoryTypes[keyof CategoryTypes],
) => {
  const all = await getProducts();

  return all.filter(el => el.category === category);
};

export const getProductById = async (category: string, itemId: string) => {
  let path = '';

  switch (category) {
    case CategoryTypes.PHONES:
      path = PathType.PHONES;
      break;
    case CategoryTypes.TABLETS:
      path = PathType.TABLETS;
      break;
    case CategoryTypes.ACCESSORIES:
      path = PathType.ACCESSORIES;
      break;
    default:
      throw new Error('Not found category');
  }

  const products = await getData<Product>(`${path}.json`);
  const product = products.find(item => item.id === itemId);

  if (!product) {
    throw new Error('Product is not foud');
  }

  return product;
};

export const getSuggestedProducts = async () => {
  const products = await getProducts();

  return [...products].sort(() => Math.random() - 0.5).slice(0, 12);
};
