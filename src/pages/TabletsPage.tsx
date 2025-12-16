import React, { useEffect, useMemo, useState } from 'react';
import { ProductList } from '../components/ProductList';
import { Pagination } from '../components/Pagination';
import { Product } from '../types/Product';

import './TabletsPage.scss';

export const TabletsPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState<string>(
    localStorage.getItem('tablets_sort') || 'newest',
  );

  const [perPage, setPerPage] = useState<number>(
    Number(localStorage.getItem('tablets_perPage')) || 16,
  );

  const [page, setPage] = useState<number>(
    Number(localStorage.getItem('tablets_page')) || 1,
  );

  useEffect(() => {
    fetch('/api/products.json')
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
      case 'newest':
        return list.sort((a, b) => b.year - a.year);
      case 'oldest':
        return list.sort((a, b) => a.year - b.year);
      case 'cheap':
        return list.sort((a, b) => a.price - b.price);
      case 'expensive':
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [tablets, sort]);

  const totalPages = Math.ceil(sorted.length / perPage);
  const start = (page - 1) * perPage;
  const visible = sorted.slice(start, start + perPage);

  useEffect(() => {
    localStorage.setItem('tablets_sort', sort);
    localStorage.setItem('tablets_perPage', String(perPage));
    localStorage.setItem('tablets_page', String(page));
  }, [sort, perPage, page]);

  return (
    <section className="tablets">
      <div className="container">
        <div className="tablets__breadcrumbs">
          <img src="/img/icons/home.svg" alt="home" />
          <span> / Tablets</span>
        </div>

        <h1 className="tablets__title">Tablets</h1>
        <p className="tablets__count">{tablets.length} models</p>

        <div className="tablets__filters">
          <div className="tablets__filter">
            <label htmlFor="sort">Sort by</label>
            <select
              value={sort}
              onChange={e => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="cheap">Cheapest</option>
              <option value="expensive">Most expensive</option>
            </select>
          </div>

          <div className="tablets__filter">
            <label htmlFor="items">Items on page</label>
            <select
              value={perPage}
              onChange={e => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>

        <ProductList products={visible} isLoading={loading} mode="grid" />

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        )}
      </div>
    </section>
  );
};
