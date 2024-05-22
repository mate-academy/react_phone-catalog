import { Product } from '../types/product';
import { ProductDetails } from '../types/productDetails';

export const getProductDetails = (
  productId: string,
  products: Product[],
  phonesDetails: ProductDetails[],
  tabletsDetails: ProductDetails[],
  accessoriesDetails: ProductDetails[],
) => {
  const getProductById = (products: Product[]) => {
    return products.find(product => product.itemId === productId);
  };

  const category = getProductById(products)?.category;

  if (category === 'phones') {
    const product = phonesDetails.find(product => product.id === productId);

    return product;
  }

  if (category === 'tablets') {
    const product = tabletsDetails.find(product => product.id === productId);

    return product;
  }

  const product = accessoriesDetails.find(product => product.id === productId);

  return product;
};
