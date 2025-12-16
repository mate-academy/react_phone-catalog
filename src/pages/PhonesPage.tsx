import React, { useEffect, useMemo, useState } from 'react';
import { ProductList } from '../components/ProductList';
import { Pagination } from '../components/Pagination';
import { Product } from '../types/Product';
import './PhonesPage.scss';

export const PhonesPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Зберігаємо фільтри в localStorage
  const [sort, setSort] = useState<string>(
    localStorage.getItem('phones_sort') || 'newest',
  );
  const [perPage, setPerPage] = useState<number>(
    Number(localStorage.getItem('phones_perPage')) || 16,
  );
  const [page, setPage] = useState<number>(
    Number(localStorage.getItem('phones_page')) || 1,
  );

  // Завантажуємо продукти
  useEffect(() => {
    fetch('/api/products.json')
      .then(r => r.json())
      .then((data: Product[]) => {
        setAllProducts(data);
        setLoading(false);
      });
  }, []);

  // Фільтруємо тільки телефони
  const phoneProducts = useMemo(
    () => allProducts.filter(p => p.category === 'phones'),
    [allProducts],
  );

  // Сортування
  const sorted = useMemo(() => {
    const list = [...phoneProducts];

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
  }, [phoneProducts, sort]);

  // Пагінація
  const totalPages = Math.ceil(sorted.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const visible = sorted.slice(start, end);

  // Зберігаємо фільтри
  useEffect(() => {
    localStorage.setItem('phones_sort', sort);
    localStorage.setItem('phones_perPage', String(perPage));
    localStorage.setItem('phones_page', String(page));
  }, [sort, perPage, page]);

  return (
    <section className="phones">
      <div className="container">
        <div className="phones__breadcrumbs">
          <img src="/img/icons/home.svg" alt="home" />
          <span> / Phones</span>
        </div>

        <h1 className="phones__title">Mobile phones</h1>
        <p className="phones__count">{phoneProducts.length} models</p>

        {/* ФІЛЬТРИ */}
        <div className="phones__filters">
          {/* SORT */}
          <div className="phones__filter">
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

          {/* ITEMS ON PAGE */}
          <div className="phones__filter">
            <label htmlFor="perPage">Items on page</label>
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

        {/* СПИСОК ПРОДУКТІВ */}
        <ProductList products={visible} isLoading={loading} mode="grid" />

        {/* ПАГІНАЦІЯ */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={newPage => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </section>
  );
};
