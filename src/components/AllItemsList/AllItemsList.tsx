import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import './AllItemsList.scss';
import { SelectBox } from '../SelectBox';
import { Pagination } from '../Pagination/Pagination';

type Props = {
  path: string;
  allItems: Product[];
  setAllItems: (el: Product[]) => void;
};

enum SortOptions {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export const AllItemsList: React.FC<Props> = ({
  path,
  allItems,
  setAllItems,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<SortOptions>(SortOptions.Newest);

  const [perPage, setPerPage] = useState('4');
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = perPage === 'all' ? allItems.length : +perPage;
  const totalPages = Math.ceil(allItems.length / +itemsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sort);
    params.set('perPage', perPage);
    params.set('page', page.toString());

    setSearchParams(params);
  }, [sort, perPage, page]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(path);
        const json: Product[] = await res.json();

        setAllItems(json);
        setPage(1);
      } catch (e) {}
    };

    getItems();
  }, [path, setAllItems]);

  const sortProducts = (items: Product[]) => {
    switch (sort) {
      case SortOptions.Newest:
        return [...items].sort((a, b) => b.year - a.year);
      case SortOptions.Alphabetically:
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case SortOptions.Cheapest:
        return [...items].sort((a, b) => {
          const priceA = a.priceDiscount ?? a.price ?? 0;
          const priceB = b.priceDiscount ?? b.price ?? 0;

          return priceA - priceB;
        });
      default:
        return items;
    }
  };

  const visibleProducts = sortProducts(allItems).slice(
    (page - 1) * itemsPerPage,
    (page - 1) * itemsPerPage + itemsPerPage,
  );

  return (
    <div className="catalog">
      <div className="catalog__filters">
        <SelectBox
          value={sort}
          onChange={value => setSort(value as SortOptions)}
          options={[
            { label: 'Newest', value: SortOptions.Newest },
            { label: 'Alphabetically', value: SortOptions.Alphabetically },
            { label: 'Cheapest', value: SortOptions.Cheapest },
          ]}
          title="Sort by"
        />

        <SelectBox
          title="Items on page"
          value={perPage}
          onChange={setPerPage}
          options={[
            { label: '4', value: '4' },
            { label: '8', value: '8' },
            { label: '16', value: '16' },
            { label: 'All', value: 'all' },
          ]}
        />
      </div>

      <div className="catalog__list">
        {visibleProducts.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>

      {totalPages !== 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={newPage => setPage(newPage)}
          // onPerPageChange={value => {
          //   setPerPage(value);
          //   setPage(0);
          // }}
        />
      )}
    </div>
  );
};
