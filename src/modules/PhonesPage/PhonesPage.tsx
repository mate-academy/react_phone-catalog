import { useEffect, useState } from 'react';
import styles from './PhonesPage.module.scss';
import { ProductsList } from '../../shared/components/ProductList/ProductsList';
import { Loader } from '../../shared/components/Loader/Loader';
import { Product } from '../../types/product';
import { getPhonesFromProducts } from '../../services/productsService';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(16);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadPhones() {
      try {
        setLoading(true);

        const phonesFromServer = await getPhonesFromProducts();

        setPhones(phonesFromServer);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPhones();
  }, []);

  const sorted = [...phones].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      default:
        return b.year - a.year;
    }
  });

  const totalItems = sorted.length;
  const totalPages =
    itemsPerPage === 'all'
      ? 1
      : Math.ceil(totalItems / (itemsPerPage as number));

  const startIndex =
    itemsPerPage === 'all' ? 0 : (currentPage - 1) * (itemsPerPage as number);
  const endIndex =
    itemsPerPage === 'all' ? totalItems : startIndex + (itemsPerPage as number);

  const paginated = sorted.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.message}>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!phones.length) {
    return <p className={styles.message}>There are no phones yet</p>;
  }

  return (
    <div className={styles.phonesPage}>
      <h1>Mobile Phones</h1>

      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="perPage">Items on page:</label>
          <select
            id="perPage"
            value={itemsPerPage}
            onChange={e =>
              setItemsPerPage(
                e.target.value === 'all' ? 'all' : Number(e.target.value),
              )
            }
            className={styles.select}
          >
            <option value="all">All</option>
            <option value="16">16</option>
            <option value="8">8</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <ProductsList products={paginated} />

      {itemsPerPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? styles.activePage : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
