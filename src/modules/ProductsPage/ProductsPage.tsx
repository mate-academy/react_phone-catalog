import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getData } from '../../utils/api';
import { Product } from '../../types';
import styles from '../ProductsPage/ProductsPage.module.scss';
import { ProductCard } from '../shared/components/ProductCard';

type Category = 'phones' | 'tablets' | 'accessories';

const categoryNames = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductsPage = () => {
  const location = useLocation();
  const category = location.pathname.slice(1);
  const title = categoryNames[category as Category];

  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = searchParams.get('page') || '1';

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'age') {
      return b.year - a.year;
    } else if (sort === 'title') {
      return a.name.localeCompare(b.name);
    } else {
      return a.price - b.price;
    }
  });

  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice((+page - 1) * +perPage, +page * +perPage);

  const countProducts = products.length;
  const countPages =
    perPage === 'all' ? 0 : Math.ceil(countProducts / +perPage);

  const startPage = Math.max(1, +page - 1);
  const endPage = Math.min(startPage + 3, countPages);

  const pages = Array.from({ length: countPages }, (_, i) => i + 1);

  const visiblePages = pages.slice(startPage - 1, endPage);

  useEffect(() => {
    getData<Product[]>('products').then(data =>
      setProducts(data.filter(p => p.category === category)),
    );
  }, [category]);

  return (
    <div className={styles.productspage}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Home.svg"
            alt="home"
          />
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Chevron_(Arrow_Right).svg"
            alt=" to"
          />
          <p className={styles.breadcrumb_category}>{category}</p>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>{countProducts} models</p>
        <div className={styles.filters}>
          <div className={styles.sort_by}>
            <p className={styles.filters_title}>Sort by</p>
            <select
              className={styles.filters_select}
              value={sort}
              onChange={e => setSearchParams({ sort: e.target.value, perPage })}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
          <div className={styles.items_on_page}>
            <p className={styles.filters_title}>Items on page</p>
            <select
              className={styles.filters_select}
              value={perPage}
              onChange={e => setSearchParams({ sort, perPage: e.target.value })}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </div>
        </div>
      </header>
      <div className={styles.products}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {countPages > 1 && (
        <div className={styles.pages}>
          <button
            disabled={+page === 1}
            className={+page === 1 ? styles.icon_disabled : styles.icon}
            onClick={() =>
              setSearchParams({ sort, perPage, page: String(+page - 4) })
            }
          >
            <img src="/img/icons/Chevron_(Arrow_Left).svg" alt="" />
          </button>
          {visiblePages.map(pageNumber => (
            <button
              className={`${styles.pages_button} ${pageNumber === +page ? styles.active : ''}`}
              key={pageNumber}
              onClick={() =>
                setSearchParams({ sort, perPage, page: String(pageNumber) })
              }
            >
              {pageNumber}
            </button>
          ))}
          <button
            disabled={+page > countPages - 3}
            className={
              +page > countPages - 3 ? styles.icon_disabled : styles.icon
            }
            onClick={() =>
              setSearchParams({ sort, perPage, page: String(+page + 4) })
            }
          >
            <img src="/img/icons/Chevron_(Arrow_Right).svg" alt="" />
          </button>
        </div>
      )}
    </div>
  );
};
