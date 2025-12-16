import React, { useEffect, useMemo, useState } from 'react';
import { ProductList } from '../components/ProductList';
import { Pagination } from '../components/Pagination';
import { Product } from '../types/Product';
import './TabletsPage.scss';

export const AccessoriesPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState<string>(
    localStorage.getItem('accessories_sort') || 'newest',
  );
  const [perPage, setPerPage] = useState<number>(
    Number(localStorage.getItem('accessories_perPage')) || 16,
  );
  const [page, setPage] = useState<number>(
    Number(localStorage.getItem('accessories_page')) || 1,
  );

  useEffect(() => {
    fetch('/api/products.json')
      .then(r => r.json())
      .then((data: Product[]) => {
        setAllProducts(data);
        setLoading(false);
      });
  }, []);

  const accessories = useMemo(
    () => allProducts.filter(p => p.category === 'accessories'),
    [allProducts],
  );

  const sorted = useMemo(() => {
    const list = [...accessories];

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
  }, [accessories, sort]);

  const totalPages = Math.ceil(sorted.length / perPage);
  const start = (page - 1) * perPage;
  const visible = sorted.slice(start, start + perPage);

  useEffect(() => {
    localStorage.setItem('accessories_sort', sort);
    localStorage.setItem('accessories_perPage', String(perPage));
    localStorage.setItem('accessories_page', String(page));
  }, [sort, perPage, page]);

  return (
    <section className="accessories">
      <div className="container">
        <div className="accessories__breadcrumbs">
          <img src="/img/icons/home.svg" alt="home" />
          <span> / Accessories</span>
        </div>

        <h1 className="accessories__title">Accessories</h1>
        <p className="accessories__count">{accessories.length} models</p>

        <div className="accessories__filters">
          <div className="accessories__filter">
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

          <div className="accessories__filter">
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
