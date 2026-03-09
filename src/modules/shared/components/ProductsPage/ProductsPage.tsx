/* eslint-disable prettier/prettier */
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useProductsByCategory } from '../hooks/useProductsByCategory';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../ProductCard/ProductCard';
import { getImg } from '../../../../utils/getImageUrl';
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
    perPage === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / Number(perPage));

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

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.filters}>
        <div className={styles.filter}>
          <label htmlFor="sort-select" className={styles.filterLabel}>
            Sort by
          </label>
          <select
            id="sort-select"
            className={styles.select}
            value={sort}
            onChange={e => handleSort(e.target.value as SortType)}
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="perPage-select" className={styles.filterLabel}>
            Items on page
          </label>
          <select
            id="perPage-select"
            className={styles.select}
            value={perPage}
            onChange={e => handlePerPage(e.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <p className={styles.empty}>
          There are no {category} yet
        </p>
      ) : (
        <div className={styles.grid}>
          {visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              fullWidth
            />
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
