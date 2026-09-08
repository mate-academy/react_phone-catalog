import { Product } from '../types/Product';
import { ItemsOnPage } from '../types/ItemsOnPage';
import { SortField } from '../types/SortField';

export const getSortedProducts = (
  products: Product[],
  query: string,
  sortField?: SortField,
  itemsOnPage?: ItemsOnPage,
  page = 1,
): [Product[], number] => {
  let visibleProducts = [...products];

  if (query) {
    visibleProducts = visibleProducts.filter(product =>
      product.name.toLowerCase().trim().includes(query.toLowerCase().trim()),
    );
  }

  const amount = visibleProducts.length;

  if (sortField) {
    switch (sortField) {
      case SortField.age:
        visibleProducts.sort((a, b) => b.year - a.year);
        break;

      case SortField.name:
        visibleProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortField.price:
        visibleProducts.sort((a, b) => a.price - b.price);
        break;

      default:
        break;
    }
  }

  if (itemsOnPage && itemsOnPage !== ItemsOnPage.all) {
    visibleProducts = visibleProducts.slice(
      +itemsOnPage * (page - 1),
      +itemsOnPage * page,
    );
  }

  return [visibleProducts, amount];
};
