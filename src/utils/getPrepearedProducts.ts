import { Product } from '../types/products';

export function getPrepearedProducts(
  products: Product[],
  searchParams: URLSearchParams,
) {
  const defaultSorting = products.sort((p1, p2) => p2.year - p1.year);

  let preperedProducts = [...defaultSorting];

  const sortParam = searchParams.get('sortBy') || null;
  const orderParam = searchParams.get('order') || null;

  const queryParam = searchParams.get('query') || '';

  if (sortParam) {
    switch (sortParam) {
      case 'price':
        preperedProducts = preperedProducts.sort(
          (p1, p2) => p1.price - p2.price,
        );
        break;
      case 'new':
        preperedProducts = preperedProducts.sort((p1, p2) => p2.year - p1.year);
        break;
      default:
        return preperedProducts;
    }
  }

  if (orderParam === 'desc') {
    preperedProducts.reverse();
  }

  if (queryParam) {
    preperedProducts = preperedProducts.filter(product =>
      product.name.toLowerCase().includes(queryParam.toLowerCase()),
    );
  }

  return preperedProducts;
}
