import { SortByOption } from '../components/FilterForms';
import { Product } from '../types/Product';

export function getPrepearedProducts(
  products: Product[],
  searchParams: URLSearchParams,
) {
  const defaultSorting = products.sort((p1, p2) => p2.year - p1.year);

  let preperedProducts = [...defaultSorting];

  const sortByParam = searchParams.get('sortBy') || null;

  const queryParam = searchParams.get('query') || '';

  if (sortByParam) {
    switch (sortByParam) {
      case SortByOption.SmallerPrice:
        preperedProducts = preperedProducts.sort(
          (p1, p2) => p1.price - p2.price,
        );
        break;

      case SortByOption.OldFirst:
        preperedProducts = preperedProducts.sort((p1, p2) => p1.year - p2.year);
        break;

      case SortByOption.BiggerPrice:
        preperedProducts = preperedProducts.sort(
          (p1, p2) => p2.price - p1.price,
        );
        break;

      default:
        return preperedProducts;
    }
  }

  if (queryParam) {
    preperedProducts = preperedProducts.filter(product =>
      product.name.toLowerCase().includes(queryParam.toLowerCase().trim()),
    );
  }

  return preperedProducts;
}
