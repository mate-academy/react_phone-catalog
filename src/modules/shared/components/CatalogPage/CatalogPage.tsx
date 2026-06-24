import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import styles from './CatalogPage.module.scss';
import allProductsRaw from '../../../../../public/api/products.json';
import { Product } from '../../../../types/Product';

const allProducts = allProductsRaw as unknown as Product[];

interface Props {
  title: string;
  category: 'phones' | 'tablets' | 'accessories';
}

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const filteredItems = allProducts.filter(
    product => product.category === category,
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  const perPage =
    perPageParam === 'all' ? sortedItems.length : Number(perPageParam);
  const totalPages = Math.ceil(sortedItems.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const visibleItems = sortedItems.slice(startIndex, startIndex + perPage);

  const changeSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(key, value);

    if (key !== 'page') {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <Link to="/" className={styles.homeLink}>
          <img src="img/Home.svg" alt="Home" />
        </Link>
        <span className={styles.arrow}>
          <img src="img/arrow-right.svg" alt="Arrow" />
        </span>
        <span className={styles.current}>{title}</span>
      </nav>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.modelsCount}>{filteredItems.length} models</p>

      {filteredItems.length === 0 ? (
        <h2 className={styles.noItems}>
          There are no {category} models yet...
        </h2>
      ) : (
        <>
          <div className={styles.dropdownsPanel}>
            <div className={styles.dropdownWrapper}>
              <label htmlFor="sort-by-select" className={styles.label}>
                Sort by
              </label>
              <select
                id="sort-by-select"
                className={`${styles.select} ${styles.sortBySelect}`}
                value={sortBy}
                onChange={e => changeSearchParam('sort', e.target.value)}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </div>

            <div className={styles.dropdownWrapper}>
              <label htmlFor="items-on-page-select" className={styles.label}>
                Items on page
              </label>
              <select
                id="items-on-page-select"
                className={`${styles.select} ${styles.itemsOnPageSelect}`}
                value={perPageParam}
                onChange={e => changeSearchParam('perPage', e.target.value)}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className={styles.grid}>
            {visibleItems.map(item => (
              <div key={item.id} className={styles.gridItem}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>

          {perPageParam !== 'all' && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={`${styles.pageButton} ${styles.prev}`}
                disabled={currentPage === 1}
                onClick={() =>
                  changeSearchParam('page', String(currentPage - 1))
                }
              >
                <img src="img/arrow-left-pag.svg" alt="Previous" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(pageNum => {
                  if (currentPage <= 2) {
                    return pageNum <= 4;
                  }

                  if (currentPage >= totalPages - 1) {
                    return pageNum >= totalPages - 3;
                  }

                  return (
                    pageNum >= currentPage - 1 && pageNum <= currentPage + 2
                  );
                })
                .slice(0, 4)
                .map(pageNum => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                    onClick={() => changeSearchParam('page', String(pageNum))}
                  >
                    {pageNum}
                  </button>
                ))}

              <button
                type="button"
                className={`${styles.pageButton} ${styles.next}`}
                disabled={currentPage === totalPages}
                onClick={() =>
                  changeSearchParam('page', String(currentPage + 1))
                }
              >
                <img src="img/arrow-right-pag.svg" alt="Next" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
