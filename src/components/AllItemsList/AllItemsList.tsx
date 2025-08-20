import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import './AllItemsList.scss';
import { Pagination } from '../Pagination/Pagination';
import { Filters } from '../Filters';
import { SortOptions } from '../Filters/Filters';
import { ClipLoader } from 'react-spinners';

type Props = {
  path?: string;
  allItems?: Product[];
  setAllItems?: (el: Product[]) => void;
  useFilters?: boolean;
};

export const AllItemsList: React.FC<Props> = ({
  path,
  allItems = [],
  setAllItems,
  useFilters = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<SortOptions>(SortOptions.Newest);
  const [perPage, setPerPage] = useState('4');
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = perPage === 'all' ? allItems.length : +perPage;
  const totalPages =
    allItems.length > 0 ? Math.ceil(allItems.length / +itemsPerPage) : 1;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!useFilters) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set('sort', sort);
    params.set('perPage', perPage);
    params.set('page', page.toString());

    setSearchParams(params);
  }, [sort, perPage, page, searchParams, setSearchParams, useFilters]);

  useEffect(() => {
    if (!path || !setAllItems) {
      setLoading(false);
      return;
    }

    const getItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(path);
        const json: Product[] = await res.json();

        setAllItems(json);
        setPage(1);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [path, setAllItems]);

  const sortProducts = (items: Product[]) => {
    switch (sort) {
      case SortOptions.Alphabetically:
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case SortOptions.Cheapest:
        return [...items].sort((a, b) => {
          const priceA = a.priceDiscount ?? a.priceRegular ?? 0;
          const priceB = b.priceDiscount ?? b.priceRegular ?? 0;

          return priceA - priceB;
        });
      case SortOptions.Newest:
      default:
        return items;
    }
  };

  const visibleProducts = sortProducts(allItems).slice(
    (page - 1) * itemsPerPage,
    (page - 1) * itemsPerPage + itemsPerPage,
  );

  if (!useFilters) {
    return loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <ClipLoader color="#905bff" size={60} />
      </div>
    ) : (
      <div className="catalog__list">
        {allItems.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    );
  }

  return loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <ClipLoader color="#905bff" size={60} />
    </div>
  ) : (
    <div className="catalog">
      <Filters
        sort={sort}
        perPage={perPage}
        onSortChange={setSort}
        onPerPageChange={setPerPage}
      />

      <div className="catalog__list">
        {visibleProducts.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={newPage => setPage(newPage)}
        />
      )}
    </div>
  );
};
