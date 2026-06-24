import React, { useContext, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import products from '../../../public/api/products.json';
import styles from './CatalogPage.module.scss';
import { Product } from '../../../public/api/types/ProductCard';
import { TITLES, isCategory, Category } from '../../../public/api/types/Titles';
import { Theme } from '../../../public/api/types/theme';
import { ThemeContext } from '../../utils/themeContext';
import { ProductCart } from '../../components/ProductCart';

type Sort = 'newest' | 'oldest' | 'price-asc' | 'price-desc';

export const CatalogPage: React.FC = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort: Sort = (searchParams.get('sort') as Sort) || 'newest';
  const perPage = Number(searchParams.get('perPage') || 16);
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const { theme } = useContext(ThemeContext);

  const category: Category = isCategory(params.category)
    ? params.category
    : 'phones';

  const theCategory = useMemo(
    () => (products as Product[]).filter(p => p.category === category),
    [category],
  );

  const sorted = useMemo(() => {
    const copy = [...theCategory];

    switch (sort) {
      case 'oldest':
        return copy.sort((a, b) => a.year - b.year);
      case 'price-asc':
        return copy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return copy.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [theCategory, sort]);

  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, pages);
  const start = (currentPage - 1) * perPage;
  const visible = sorted.slice(start, start + perPage);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      sort: e.target.value,
      perPage: String(perPage),
      page: '1',
    });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      sort,
      perPage: e.target.value,
      page: '1',
    });
  };

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), pages);

    setSearchParams({
      sort,
      perPage: String(perPage),
      page: String(next),
    });
  };

  return (
    <>
      <div
        className={[
          styles.models,
          theme === Theme.LIGHT ? styles['models--light'] : '',
        ].join(' ')}
      >
        <div className={styles.models__breadcrumb}>
          <Link to="/">
            {theme === Theme.DARK ? (
              <img
                src="img/icons/Home.svg"
                alt="Home"
                className={styles.models__breadcrumb__icon}
              />
            ) : (
              <img
                src="img/icons/HomeLig.svg"
                alt="Home"
                className={styles.models__breadcrumb__icon}
              />
            )}
          </Link>
          <img
            src="img/icons/ArrowRight.svg"
            alt=""
            className={styles.models__breadcrumb__icon}
          />
          <span className={styles.models__breadcrumb__currentPage}>
            {TITLES[category]}
          </span>
        </div>

        <div className={styles.models__header}>
          <p className={styles.models__title}>{TITLES[category]}</p>
          <p className={styles.models__text}>{theCategory.length} models</p>
        </div>

        <div className={styles.models__select}>
          <label className={styles.models__select__label} htmlFor="sort-select">
            Sort by
            <select
              id="sort-select"
              className={`${styles.models__select__input} ${styles['models__select__input--right']}`}
              value={sort}
              onChange={handleSortChange}
            >
              <option className={styles.models__select__option} value="newest">
                Newest
              </option>
              <option className={styles.models__select__option} value="oldest">
                Oldest
              </option>
              <option
                className={styles.models__select__option}
                value="price-asc"
              >
                Price: Low to High
              </option>
              <option
                className={styles.models__select__option}
                value="price-desc"
              >
                Price: High to Low
              </option>
            </select>
          </label>

          <label
            className={styles.models__select__label}
            htmlFor="perpage-select"
          >
            Items on page
            <select
              id="perpage-select"
              className={styles.models__select__input}
              value={String(perPage)}
              onChange={handlePerPageChange}
            >
              <option className={styles.models__select__option} value="8">
                8
              </option>
              <option className={styles.models__select__option} value="16">
                16
              </option>
              <option className={styles.models__select__option} value="32">
                32
              </option>
            </select>
          </label>
        </div>

        <div className={styles.models__products}>
          {visible.map(p => (
            <ProductCart key={p.itemId} product={p} />
          ))}
        </div>

        {pages > 1 && (
          <nav className={styles.models__pagination} aria-label="Pagination">
            <button
              className={`${styles.models__pagination__pageBtn} ${styles['models__pagination__pageBtn--arrow']}`}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ marginRight: '8px' }}
              aria-label="Previous page"
            >
              ‹
            </button>

            {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                className={`${styles.models__pagination__pageBtn} ${n === currentPage ? styles['models__pagination__pageBtn--active'] : ''}`}
                onClick={() => goToPage(n)}
                aria-current={n === currentPage ? 'page' : undefined}
              >
                {n}
              </button>
            ))}

            <button
              className={`${styles.models__pagination__pageBtn} ${styles['models__pagination__pageBtn--arrow']}`}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pages}
              style={{ marginLeft: '8px' }}
              aria-label="Next page"
            >
              ›
            </button>
          </nav>
        )}
      </div>
    </>
  );
};
