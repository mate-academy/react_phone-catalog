import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../../components/ProductList';
import { Pagination } from '../../components/Pagination';
import { Product } from '../../types/Product';

import './TabletsPage.scss';

export const TabletsPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage');

  const perPage: number | 'all' =
    perPageParam === 'all'
      ? 'all'
      : perPageParam
        ? Number(perPageParam)
        : 'all';

  useEffect(() => {
    fetch(`api/products.json`)
      .then(r => r.json())
      .then((data: Product[]) => {
        setAllProducts(data);
        setLoading(false);
      });
  }, []);

  const tablets = useMemo(
    () => allProducts.filter(p => p.category === 'tablets'),
    [allProducts],
  );

  const sorted = useMemo(() => {
    const list = [...tablets];

    switch (sort) {
      case 'age':
        return list.sort((a, b) => b.year - a.year);
      case 'title':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return list.sort((a, b) => a.price - b.price);
      default:
        return list;
    }
  }, [tablets, sort]);

  const totalPages = perPage === 'all' ? 1 : Math.ceil(sorted.length / perPage);

  const visible =
    perPage === 'all'
      ? sorted
      : sorted.slice((page - 1) * perPage, page * perPage);

  const isEmpty = !loading && tablets.length === 0;

  const updateParams = (params: {
    sort?: string;
    page?: number;
    perPage?: number | 'all';
  }) => {
    const next = new URLSearchParams(searchParams);

    if (params.sort) {
      next.set('sort', params.sort);
    }

    if (params.page && params.page !== 1) {
      next.set('page', String(params.page));
    } else {
      next.delete('page');
    }

    if ('perPage' in params) {
      if (params.perPage === 'all') {
        next.delete('perPage');
      } else if (params.perPage) {
        next.set('perPage', String(params.perPage));
      }
    }

    setSearchParams(next);
  };

  const query = searchParams.get('query') || '';

  const filtered = useMemo(() => {
    return sorted.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [sorted, query]);

  return (
    <section className="tablets">
      <div className="container">
        <div className="tablets__breadcrumbs">
          <img src={`img/icons/home.svg`} alt="home" />
          <span> / Tablets</span>
        </div>

        <h1 className="tablets__title">Tablets</h1>
        <p className="tablets__count">{tablets.length} models</p>

        <div className="tablets__filters">
          <div className="tablets__filter">
            <label htmlFor="sort">Sort by</label>
            <select
              value={sort}
              onChange={e => updateParams({ sort: e.target.value, page: 1 })}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>

          <div className="tablets__filter">
            <label htmlFor="items">Items on page</label>
            <select
              value={perPage}
              onChange={e =>
                updateParams({
                  perPage:
                    e.target.value === 'all' ? 'all' : Number(e.target.value),
                  page: 1,
                })
              }
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        {!loading && filtered.length === 0 && (
          <div className="products-empty">
            <img
              src={`img/icons/search.svg`}
              alt="Nothing found"
              className="products-empty__icon"
            />
            <p className="products-empty__text">
              There are no tablets matching the query
            </p>
          </div>
        )}

        {!isEmpty && (
          <ProductList products={visible} isLoading={loading} mode="grid" />
        )}
        {isEmpty && <p className="tablets__empty">There are no tablets yet</p>}

        {!isEmpty && perPage !== 'all' && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={newPage => updateParams({ page: newPage })}
          />
        )}
      </div>
    </section>
  );
};
