/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Pagination } from '../Pagination/Pagination';
import { Filters } from '../Filters/Filters';
import { SortOptions } from '../Filters/Filters';
import { ClipLoader } from 'react-spinners';

import style from './AllItemsList.module.scss';

type Props = {
  path?: string;
  allItems?: Product[];
  setAllItems?: (el: Product[]) => void;
  useFilters?: boolean;
  categoryName?: string;
};

export const AllItemsList: React.FC<Props> = ({
  path,
  allItems = [],
  setAllItems,
  useFilters = true,
  categoryName = 'products',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<SortOptions>(() => {
    const sortParam = searchParams.get('sort');

    return (sortParam as SortOptions) || SortOptions.Newest;
  });

  const [perPage, setPerPage] = useState<string>(() => {
    return searchParams.get('perPage') || '4';
  });

  const [page, setPage] = useState<number>(() => {
    const pageParam = searchParams.get('page');

    return pageParam ? +pageParam : 1;
  });

  const itemsPerPage = perPage === 'all' ? allItems.length : +perPage;
  const totalPages =
    allItems.length > 0 ? Math.ceil(allItems.length / +itemsPerPage) : 1;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sort);
    params.set('perPage', perPage);
    params.set('page', page.toString());

    setSearchParams(params);
  }, [sort, perPage, page]);

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

        if (!searchParams.get('page')) {
          setPage(1);
        }
      } catch (e) {
        setError(true);
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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <ClipLoader color="#905bff" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p>Something went wrong</p>
        <button
          className={style.reload__button}
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  if (allItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p>There are no {categoryName} yet</p>
      </div>
    );
  }

  if (!useFilters) {
    return (
      <div className={style.catalog__list}>
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
    <div className={style.catalog}>
      <Filters
        sort={sort}
        perPage={perPage}
        onSortChange={setSort}
        onPerPageChange={setPerPage}
        onPageChange={setPage}
      />

      <div className={style.catalog__list}>
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
