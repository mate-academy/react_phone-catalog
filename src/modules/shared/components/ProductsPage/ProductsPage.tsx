/* eslint-disable prettier/prettier */
import { useSearchParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { useProductsByCategory } from '../hooks/useProductsByCategory';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../ProductCard/ProductCard';
import { getImg } from '../../../../utils/getImageUrl';
import { Dropdown } from '../Dropdown/Dropdown';
import styles from './ProductsPage.module.scss';

type SortType = 'age' | 'name' | 'price';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
  breadcrumbLabel: string;
};

export const ProductsPage = ({ category, title, breadcrumbLabel }: Props) => {
  const { products, loading, error } = useProductsByCategory(category);
  const [searchParams, setSearchParams] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sort = (searchParams.get('sort') || 'age') as SortType;
  const page = Number(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || '16';

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    switch (sort) {
      case 'name':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      case 'age':
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [products, sort]);

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / Number(perPage));

  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(
        (page - 1) * Number(perPage),
        page * Number(perPage),
      );

  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, page - 1);
    const end = Math.min(start + 3, totalPages);

    if (end - start < 3) {
      start = Math.max(1, end - 3);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleSort = (value: SortType) => {
    const params: Record<string, string> = { sort: value };

    if (perPage !== 'all') {
      params.perPage = perPage;
    }

    setSearchParams(params);
  };

  const handlePerPage = (value: string) => {
    if (value === 'all') {
      setSearchParams({ sort });
    } else {
      setSearchParams({ sort, perPage: value });
    }
  };

  const handlePage = (value: number) => {
    setSearchParams({ sort, perPage, page: String(value) });
  };

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  const sortWidth = windowWidth >= 1200 ? 176 : windowWidth >= 640 ? 187 : 100;
  const perPageWidth = windowWidth >= 640 ? 136 : 100;

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.filters}>
        <Dropdown
          label="Sort by"
          value={sort}
          onChange={value => handleSort(value as SortType)}
          options={[
            { value: 'age', label: 'Newest' },
            { value: 'name', label: 'Alphabetically' },
            { value: 'price', label: 'Cheapest' },
          ]}
          width={sortWidth}
        />

        <Dropdown
          label="Items on page"
          value={perPage}
          onChange={handlePerPage}
          options={[
            { value: '4', label: '4' },
            { value: '8', label: '8' },
            { value: '16', label: '16' },
            { value: 'all', label: 'All' },
          ]}
          width={perPageWidth}
        />
      </div>

      {visibleProducts.length === 0 ? (
        <p className={styles.empty}>There are no {category} yet</p>
      ) : (
        <div className={styles.grid}>
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} fullWidth />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => handlePage(page - 1)}
            disabled={page === 1}
          >
            <img src={getImg('/img/icons/arrow-left.svg')} alt="Previous" />
          </button>

          {getVisiblePages().map(p => (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}
              onClick={() => handlePage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            onClick={() => handlePage(page + 1)}
            disabled={page === totalPages}
          >
            <img src={getImg('/img/icons/arrow-right.svg')} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};
