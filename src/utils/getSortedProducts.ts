import { Products } from '../types/Products';

export const getSortedProducts = (
  productData: Products[],
  sort: string,
  query?: string,
) => {
  let sortedProducts = [...productData];

  if (sort === 'Newest') {
    sortedProducts = sortedProducts.sort(
      (itemA, itemB) => itemA.year - itemB.year,
    );
  }

  if (sort === 'Alphabet') {
    sortedProducts = sortedProducts.sort((itemA, itemB) =>
      itemA.name.localeCompare(itemB.name),
    );
  }

  if (sort === 'Chepest') {
    sortedProducts = sortedProducts.sort(
      (itemA, itemB) => itemA.price - itemB.price,
    );
  }

  if (query) {
    const queryFilter = (param?: string | null) => {
      return param ? param.toLowerCase().includes(query.toLowerCase()) : null;
    };

    sortedProducts = sortedProducts.filter(product =>
      queryFilter(product.name),
    );
  }

  return sortedProducts || null;
};
