import React, { useMemo } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import styles from './CategoryPage.module.scss';
import { Breadcrumb } from '../../components/Breadcrumb';
import { BackButton } from '../../components/BackButton';
import { ProductCard } from '../../components/ProductCard';
import { CustomDropdown } from '../../components/CustomDropdown';
import { useProducts } from '../../hooks/useProducts';
import { useErrorHandling } from '../../hooks/errorHandling';
import classNames from 'classnames';
import { useTheme } from '../../hooks/useTheme';
import { Loader } from '../../components/Loader/Loader';
import { Product } from '../../types/Product';

type SortOption = 'alphabetically' | 'priceLow' | 'priceHigh' | 'newest';

const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  switch (sortBy) {
    case 'alphabetically':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case 'priceLow':
      return [...products].sort((a, b) => a.price - b.price);
    case 'priceHigh':
      return [...products].sort((a, b) => b.price - a.price);
    case 'newest':
    default:
      return [...products].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }
};

export const CategoryPage: React.FC = () => {
  const { theme } = useTheme();
  const { category = '' } = useParams();
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = Number(searchParams.get('perPage')) || 8;
  const sortBy = (searchParams.get('sort') as SortOption) || 'newest';

  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));

  const updateParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    for (const key in params) {
      newParams.set(key, String(params[key]));
    }

    setSearchParams(newParams);
  };

  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === category);
  }, [products, category]);

  const sortedProducts = useMemo(() => {
    return sortProducts(categoryProducts, sortBy);
  }, [categoryProducts, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  if (!products || products.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.categoryPage}>
      <div className={styles.breadcrumbRow}>
        <Breadcrumb current="" />
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {capitalizedCategory}
        </Link>
        <img
          src={`/react_phone-catalog/img/icons/arrow-right-${theme}.svg`}
          alt="Arrow"
        />
      </div>

      <BackButton />

      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{capitalizedCategory}</h1>
        <span className={styles.count}>{categoryProducts.length} models</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <CustomDropdown
            label="Sort by"
            value={sortBy}
            onChange={value => updateParams({ sort: value, page: 1 })}
            options={[
              { value: 'newest', label: 'Newest' },
              { value: 'alphabetically', label: 'Alphabetically' },
              { value: 'priceLow', label: 'Price low to high' },
              { value: 'priceHigh', label: 'Price high to low' },
            ]}
          />
        </div>

        <div className={styles.selectGroup}>
          <CustomDropdown
            label="Items on page"
            value={String(itemsPerPage)}
            onChange={value => updateParams({ perPage: value, page: 1 })}
            options={[
              { value: '4', label: '4' },
              { value: '8', label: '8' },
              { value: '16', label: '16' },
            ]}
          />
        </div>
      </div>

      {paginatedProducts.length === 0 ? (
        <p className={styles.empty}>No products available.</p>
      ) : (
        <ul className={styles.list}>
          {paginatedProducts.map(product => (
            <li key={product.itemId} className={styles.item}>
              <ProductCard product={product} showFullPrice />
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => updateParams({ page: currentPage - 1 })}
            className={styles.arrowButton}
            disabled={currentPage === 1}
          >
            <img
              src={`/react_phone-catalog/img/icons/arrow-left-${theme}.svg`}
              alt="Prev"
            />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              page =>
                totalPages <= 4 ||
                (page >= currentPage - 1 && page <= currentPage + 2),
            )
            .slice(0, 4)
            .map(page => (
              <button
                key={page}
                onClick={() => updateParams({ page })}
                className={classNames({
                  [styles.pageButtonActive]: page === currentPage,
                  [styles.pageButton]: page !== currentPage,
                })}
              >
                {page}
              </button>
            ))}

          <button
            onClick={() => updateParams({ page: currentPage + 1 })}
            className={styles.arrowButton}
            disabled={currentPage === totalPages}
          >
            <img
              src={`/react_phone-catalog/img/icons/arrow-right-${theme}.svg`}
              alt="Next"
            />
          </button>
        </div>
      )}
    </div>
  );
};
