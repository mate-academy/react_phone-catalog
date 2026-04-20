import { Link, useSearchParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';
import productsData from '../../../public/api/products.json';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';

interface Props {
  title: string;
  category: 'phones' | 'tablets' | 'accessories';
}

export const CategoryPage = ({ title, category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const perPage = searchParams.get('perPage') || 'all';

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [category]);

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };
  const filteredProducts = productsData.filter(
    product => product.category === category,
  );
  const sort = searchParams.get('sort') || 'age';
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'title') return a.name.localeCompare(b.name);
    if (sort === 'price')
      return (a.price || a.fullPrice) - (b.price || b.fullPrice);
    if (sort === 'age') return b.year - a.year;
    return 0;
  });

  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage =
    perPage === 'all' || perPage === 'All'
      ? filteredProducts.length
      : Number(perPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const visibleProducts = sortedProducts.slice(firstItemIndex, lastItemIndex);

  // const visibleProducts = filteredProducts.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (isLoading) {
    return <Loader />;
  }
  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <h2>Somethig went wrong</h2>
        <button
          className={styles.reloadButton}
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return <h1 className={styles.title}>There are no {category} yet</h1>;
  }
  const visiblePages = (() => {
    const maxVisible = 4;

    let start = currentPage - 1;
    if (start <= 0) start = 1;

    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  })();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.breadCrumbs}>
        <Link to="/" className={styles.homeIcon}>
          <img src="/img/icons/Home.png" alt="Home" />
        </Link>
        <img
          src="/img/icons/rightArrow.png"
          alt="right"
          className={styles.separator}
        />
        <span className={styles.currentCategory}>{category}</span>
      </div>

      <div className={styles.headerBlock}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.modelsCount}>{filteredProducts.length} models</p>
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.filterBlock}>
          <label className={styles.label}>Sort by</label>
          <select
            className={styles.select}
            value={sort}
            onChange={handleSortChange}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.filterBlock}>
          <label className={styles.label}> Items on page</label>
          <select
            className={styles.select}
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.gridPlaceholder}>
        <ProductsList products={visibleProducts} />
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {'<'}
          </button>
          {visiblePages.map(pageNum => (
            <button
              key={pageNum}
              className={`${styles.pageButton} ${pageNum === currentPage ? styles.active : ''}`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            className={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
};
