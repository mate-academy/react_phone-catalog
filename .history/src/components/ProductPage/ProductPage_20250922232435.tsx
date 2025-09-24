/* eslint-disable max-len, padding-line-between-statements */
import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsContext, type Product } from '../../ProductsProvider';
import { SortField } from './SortField/SortField';
import { Pagination } from './Pagination/Pagination';

type Props = { category: 'phones' | 'tablets' | 'accessories' };

export const ProductPage: React.FC<Props> = ({ category }) => {
  const { products } = useContext(ProductsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'Newest';
  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 8);

  const filtered = useMemo(
    () => products.filter(p => p.category === category),
    [products, category],
  );

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        case 'Cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [filtered, sort]);

  const pagesCount = Math.max(1, Math.ceil(sorted.length / perPage));
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(page * perPage, sorted.length);
  const paged = sorted.slice(startIndex, endIndex);

  const setSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    if (newSort === 'Newest') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }
    params.delete('page');
    setSearchParams(params);
  };

  const goPrev = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(Math.max(1, page - 1)));
    setSearchParams(params);
  };
  const goNext = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(Math.min(pagesCount, page + 1)));
    setSearchParams(params);
  };
  const selectPage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    if (p === 1) {
      params.delete('page');
    } else {
      params.set('page', String(p));
    }
    setSearchParams(params);
  };

  return (
    <div>
      <h1>{category}</h1>
      <SortField sort={sort} onChange={setSort} />
      {sorted.length === 0 ? (
        <p>There are no {category} yet</p>
      ) : (
        <ul>
          {paged.map((p: Product) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
      <Pagination
        page={page}
        pagesCount={pagesCount}
        onPrev={goPrev}
        onNext={goNext}
        onSelect={selectPage}
      />
    </div>
  );
};
