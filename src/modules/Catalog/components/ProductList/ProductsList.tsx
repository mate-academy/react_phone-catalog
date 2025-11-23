import { useMemo } from 'react';
import { Product } from '../../../../api/types';
import { Dropdowns } from '../Dropdowns/Dropdowns';
import scss from './ProductsList.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';

interface Props {
  items: Product[];
}

export const ProductsList: React.FC<Props> = ({ items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || 'age';
  const pageParam = searchParams.get('page') || '1';
  const perPageParam = searchParams.get('perPage') || 'all';

  const sortByOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'price', label: 'Cheapest' },
    { value: 'title', label: 'Alphabetically' },
  ];

  const sliceByOptions = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'All' },
  ];

  const sortedItems = useMemo(() => {
    const itemsToSort = [...items];

    switch (sortParam) {
      case 'age':
        return itemsToSort.sort((a, b) => b.year - a.year);
      case 'price':
        return itemsToSort.sort((a, b) => a.price - b.price);
      case 'title':
        return itemsToSort.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return itemsToSort.sort((a, b) => b.year - a.year);
    }
  }, [items, sortParam]);

  const paginatedItems = useMemo(() => {
    if (perPageParam === 'all') {
      return sortedItems;
    }

    const page = +pageParam;
    const perPage = +perPageParam;

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, pageParam, perPageParam]);

  const totalPages = useMemo(() => {
    if (perPageParam === 'all') {
      return 1;
    }

    return Math.ceil(items.length / +perPageParam);
  }, [items, perPageParam]);

  const sortBy = (value: string) => {
    setSearchParams(
      prevParams => {
        prevParams.set('sort', value);
        prevParams.delete('page');

        return prevParams;
      },
      { replace: true },
    );
  };

  const sliceBy = (value: string) => {
    setSearchParams(
      prevParams => {
        if (value === 'all') {
          prevParams.delete('perPage');
          prevParams.delete('page');
        } else {
          prevParams.set('perPage', value);
          prevParams.delete('page');
        }

        return prevParams;
      },
      { replace: true },
    );
  };

  const handlePageChange = (newPageNumber: number) => {
    setSearchParams(
      prevParams => {
        if (newPageNumber === 1) {
          prevParams.delete('page');
        } else {
          prevParams.set('page', newPageNumber.toString());
        }

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        return prevParams;
      },
      { replace: true },
    );
  };

  return (
    <div className={scss.productsList}>
      <div className={scss.productsList__dropdownWrapper}>
        <Dropdowns
          label="Sort by"
          options={sortByOptions}
          selectedValue={sortParam}
          onSelect={value => sortBy(value)}
        />
        <Dropdowns
          label="Items on page"
          options={sliceByOptions}
          selectedValue={perPageParam}
          onSelect={value => sliceBy(value)}
        />
      </div>

      <ul className={scss.productsList__itemsList}>
        {paginatedItems.map(item => (
          <li key={item.id} className={scss.productsList__item}>
            <ProductCard product={item} hasDiscount={false} />
          </li>
        ))}
      </ul>
      {totalPages > 0 && (
        <Pagination
          total={totalPages}
          currentPage={+pageParam}
          onPageChange={newPage => handlePageChange(newPage)}
        />
      )}
    </div>
  );
};
