import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getData } from '../utils/httpClient';

export const getProductDetails = async (
  itemId: string,
): Promise<ProductDetails | null> => {
  const allProducts: Product[] = await getData<Product[]>('/api/products.json');
  const productMatch = allProducts.find(product => product.itemId === itemId);

  if (productMatch) {
    const categoryProducts: ProductDetails[] = await getData<ProductDetails[]>(
      `/api/${productMatch.category}.json`,
    );
    const detailedProduct = categoryProducts.find(p => p.id === itemId);

    return detailedProduct ?? null;
  } else {
    return null;
  }
};

// export const getAllProductDetails = async (
//   itemId: string,
//   namespaceId: string,
// ): Promise<ProductDetails | null> => {
//   const products: Product[] = await getData<Product[]>('/api/products.json');
//   const productMatch = products.find(product => product.itemId === itemId);

//   if (productMatch) {
//     const categoryProducts: ProductDetails[] = await getData<ProductDetails[]>(
//       `/api/${productMatch.category}.json`,
//     );

//     const detailedProduct = categoryProducts.filter(
//       p => p.namespaceId === namespaceId,
//     );

//     return detailedProduct ?? null;
//   }
// };
