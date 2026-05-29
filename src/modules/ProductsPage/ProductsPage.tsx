import React, { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getData } from '../../utils/api';
import { Product } from '../../types';
import styles from '../ProductsPage/ProductsPage.module.scss';
import { ProductCard, ProductCardLoading } from '../shared/components';
import { Errors } from '../shared/components/Errors/Errors';
import { useAsync } from '../../hooks/useAsync';

type Category = 'phones' | 'tablets' | 'accessories';

const categoryNames = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const perPageOptions = ['4', '8', '16', 'all'];
const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const ProductsPage = () => {
  const location = useLocation();
  const category = location.pathname.slice(1);
  const title = categoryNames[category as Category];

  const { data, isLoading, isError } = useAsync(
    () =>
      getData<Product[]>('products').then(d =>
        d.filter(p => p.category === category),
      ),
    [category],
  );

  const products = data ?? [];

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

  const [isOpen, setIsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className={styles.productspage}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">
            <img
              className={styles.breadcrumb_icon}
              src="/img/icons/Home.svg"
              alt="home"
            />
          </Link>
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
            <button
              className={`${styles.dropdown_header} ${isSortOpen ? styles.open : ''}`}
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsOpen(false);
              }}
            >
              {sortOptions.find(o => o.value === sort)?.label}
              <img
                src={
                  isSortOpen
                    ? '/img/icons/Chevron_(Arrow_Up).svg'
                    : '/img/icons/Chevron_(Arrow_Down).svg'
                }
                alt=""
              />
            </button>

            {isSortOpen && (
              <ul className={styles.dropdown_list}>
                {sortOptions.map(({ value, label }) => (
                  <li
                    key={value}
                    className={`${styles.dropdown_item} ${sort === value ? styles.active : ''}`}
                    onClick={() => {
                      setSearchParams({ sort: value, perPage });
                      setIsSortOpen(false);
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.items_on_page}>
            <p className={styles.filters_title}>Items on page</p>
            <div className={styles.dropdown}>
              <button
                className={`${styles.dropdown_header} ${isOpen ? styles.open : ''}`}
                onClick={() => {
                  setIsOpen(!isOpen);
                  setIsSortOpen(false);
                }}
              >
                {perPage}
                <img
                  src={
                    isOpen
                      ? '/img/icons/Chevron_(Arrow_Up).svg'
                      : '/img/icons/Chevron_(Arrow_Down).svg'
                  }
                  alt=""
                />
              </button>

              {isOpen && (
                <ul className={styles.dropdown_list}>
                  {perPageOptions.map(value => (
                    <li
                      key={value}
                      className={`${styles.dropdown_item} ${perPage === value ? styles.active : ''}`}
                      onClick={() => {
                        setSearchParams({ sort, perPage: value });
                        setIsOpen(false);
                      }}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
      {isError && <Errors type="fetch-error" />}
      {!isError && (
        <div className={styles.products}>
          {isLoading ? (
            <ProductCardLoading count={perPage === 'all' ? 8 : +perPage} />
          ) : products.length === 0 ? (
            <Errors type="empty" />
          ) : (
            visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}

      {!isLoading && countPages > 1 && (
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
