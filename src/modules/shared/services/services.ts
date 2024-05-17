import { Product } from '../types/Product';
import { client } from './httpClient';

export function getAllProducts() {
  return client.get<Product[]>('/products.json');
}

// export function getProdutsByCategory(category: string): Promise<Product[]> {
//   return client.get<Product[]>(`/${category}.json`);
// }

export function getHotPriceProducts(): Promise<Product[]> {
  return getAllProducts()
    .then(allProducts =>
      allProducts.filter(product => product.price !== product.fullPrice),
    )
    .then(filteredProducts =>
      filteredProducts.sort((a, b) => {
        const discountValueA = a.fullPrice - a.price;
        const discountValueB = b.fullPrice - b.price;

        return discountValueB - discountValueA;
      }),
    );
}

export function getBrandNewProducts(): Promise<Product[]> {
  return getAllProducts().then(allProducts =>
    allProducts
      .sort((a, b) => b.price - a.price)
      .sort((a, b) => b.year - a.year),
  );
}
