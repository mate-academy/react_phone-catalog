import { Product } from '../../../../../types/Product';

export function getSearchedProducts(products: Product[], query: string | null) {
  if (!query) {
    return products;
  }

  return products.filter(({ name }) => {
    const nameEdited = name.toLowerCase();
    const editedQuery = query.trim().toLowerCase();

    return nameEdited.includes(editedQuery);
  });
}
