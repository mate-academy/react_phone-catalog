import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/product';
import { ProductCard } from '../../components/ProductCard';
import { getPreparedProducts } from '../../utils/getPreparedProducts';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '8';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    getProducts()
      .then(data => {
        const phonesOnly = data.filter(item => item.category === 'phones');

        setProducts(phonesOnly);
      })
      .catch(() => setError('Failed to load phones'))
      .finally(() => setLoading(false));
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());
    setSearchParams(params);
  };

  const { preparedProducts, totalItems } = useMemo(() => {
    return getPreparedProducts(products, sortBy, perPage, currentPage);
  }, [products, sortBy, perPage, currentPage]);

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(totalItems / Number(perPage));

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <main className={`container ${styles.pageWrapper}`}>
      {/* Хлібні крихти з іконкою будинку */}
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.crumbLink}>
          <img src="./img/icons/home.svg" alt="Home" />
        </Link>
        <span className={styles.crumbSeparator}>&gt;</span>
        <span className={styles.crumbCurrent}>Phones</span>
      </div>

      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.count}>{totalItems} models</p>

      {/* Блок фільтрів */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort-by" className={styles.label}>
            Sort by
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="age">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="per-page" className={styles.label}>
            Items on page
          </label>
          <select
            id="per-page"
            value={perPage}
            onChange={handlePerPageChange}
            className={styles.select}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* Глобальна адаптивна сітка товарів з Figma */}
      <div className="mainGrid">
        {preparedProducts.map(product => (
          <div key={product.id} className="colProductCard">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Пагінація */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={styles.pageBtn}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ''}`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={styles.pageBtn}
          >
            &gt;
          </button>
        </div>
      )}
    </main>
  );
};
