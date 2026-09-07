import { useMemo } from 'react';
import { DEFAULT_ITEM_COUNT } from '../constants/DEFAUL_ITEM_COUNT';
import { useSearchWith } from './useSearchWith';
import { SortTypes } from '../types/sortTypes';
import { ProductType } from '../../../shared/types/ProductType';

interface Props {
  items: ProductType[];
}

export const useFilter = ({ items }: Props) => {
  const { searchParams } = useSearchWith();

  const sortParams = (searchParams.get('sort') || 'age') as SortTypes;
  const queryParams = searchParams.get('query') || '';
  const itemsPerPage =
    Number(searchParams.get('perPage')) || DEFAULT_ITEM_COUNT;
  const currPage = Number(searchParams.get('page')) || 1;

  const filtredItems = useMemo(() => {
    const normalaizedQuery = queryParams.toLocaleLowerCase();
    const filterByQuery = items.filter(item =>
      item.name.toLocaleLowerCase().includes(normalaizedQuery),
    );

    let sortItems = [...filterByQuery].sort((a, b) => {
      switch (sortParams) {
        case 'age':
          return a.year - b.year;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
      }
    });

    return sortItems;
  }, [sortParams, queryParams, items]);

  const start = itemsPerPage * currPage - itemsPerPage;
  const end = itemsPerPage * currPage;

  const paginationItem = filtredItems.slice(start, end);

  return { items: paginationItem, totalItem: filtredItems.length };
};
