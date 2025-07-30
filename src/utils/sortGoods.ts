import { Accessories } from '../types/Accessories';
import { Phones } from '../types/Phones';
import { Products } from '../types/Products';
import { Tablets } from '../types/Tablets';

export const getSortedGoods = (
  typeSort: string,
  goods: Phones[] | Tablets[] | Accessories[],
  products: Products[],
) => {
  const sorted = [...goods];

  if (typeSort === 'Newest') {
    return sorted.sort((a, b) => {
      const prodA = products.find(val => val.itemId === a.id);
      const prodB = products.find(val => val.itemId === b.id);

      return (prodB?.year || 0) - (prodA?.year || 0);
    });
  }

  if (typeSort === 'Alphabetically') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (typeSort === 'Cheapest') {
    return sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
  }

  return sorted;
};

export const searchFilter = (
  goods: Phones[] | Tablets[] | Accessories[],
  searchParams: string,
) => {
  let filtered = [...goods];

  if (searchParams !== '') {
    filtered = filtered.filter(item => {
      return item.name
        .trim()
        .toLocaleLowerCase()
        .includes(searchParams.trim().toLocaleLowerCase());
    });
  }

  return filtered;
};

export const getVisibleProducts = (
  goods: Tablets[] | Phones[] | Accessories[],
  currentPage: number,
  itemsPerPage: string | 'all',
) => {
  const itemsPerPageNum = itemsPerPage === 'all' ? goods.length : +itemsPerPage;
  const startIndex = (currentPage - 1) * itemsPerPageNum;
  const endIndex = startIndex + itemsPerPageNum;

  return goods.slice(startIndex, endIndex);
};

export const getPageCount = (
  goodsLength: number,
  itemsPerPage: string | 'all',
) => {
  return itemsPerPage === 'all' ? 1 : Math.ceil(goodsLength / +itemsPerPage);
};
