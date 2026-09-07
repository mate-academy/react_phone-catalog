import { Product, ProductDetails } from '../types/Product';
import { client } from './apiClient';

export const getAllProducts = () => {
  return client<Product[]>('api/products.json');
};

export const getProductDetails = (category: string, productId: string) => {
  // A lógica de buscar a categoria e encontrar o produto fica aqui
  return client<ProductDetails[]>(`api/${category}.json`).then(products =>
    products.find(p => p.id === productId),
  );
};

export const getSuggestedProducts = async (currentProduct: ProductDetails) => {
  // A lógica de buscar todos os produtos e filtrar as sugestões fica aqui
  const allProducts = await getAllProducts();

  return allProducts
    .filter(
      p =>
        p.category === currentProduct.category &&
        p.itemId !== currentProduct.id,
    )
    .slice(0, 10);
};
