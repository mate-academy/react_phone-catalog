import { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { useProducts } from '../../contexts/ProductContext';
import { Pagination } from '../Pagination/Pagination';
import { ProductsList } from '../ProductsList/ProductsList';
import { Item } from '../../types/Item';
import { Dropdown } from '../Dropdown/Dropdown';
import { useSearchParams } from 'react-router-dom';

type Props = {
  products: Item[];
};

export const Products: React.FC<Props> = ({ products }) => {
  const [sortedBy, setSortedBy] = useState('Newest');
  const [sortedProducts, setSortedProducts] = useState<Item[]>([]);
  const [perPage, setPerPage] = useState<number | string>('All');
  const [page, setPage] = useState<number>(1);
  const { allProducts } = useProducts();
  const itemsOnPage = [4, 8, 16, 'all'];
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePerPageChange = (val: string | number) => {
    if (val === 'all') {
      setPerPage('all');
    } else {
      setPerPage(Number(val));
    }

    setPage(1);
  };

  let startIndex = 0;
  let endIndex = sortedProducts.length;

  useEffect(() => {
    const params: Record<string, string | number> = {
      ...Object.fromEntries(searchParams),
      sort: sortedBy === 'Newest' ? 'age' : sortedBy === 'Alphabetically' ? 'title' : 'price',
    };

    if (page !== 1) {
      params.page = page;
    }

    if (perPage !== 'All') {
      params.perPage = perPage;
    }

    setSearchParams(params);
  }, [sortedBy, perPage, page]);

  if (typeof perPage === 'number') {
    startIndex = (page - 1) * perPage;
    endIndex = startIndex + perPage;
  }

  const currentItems = sortedProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (!products.length) {
      return;
    }

    let sorted: Item[] = [];

    switch (sortedBy) {
      case 'Newest':
        sorted = [...products].sort((a, b) => {
          const yearA = allProducts.find(p => p.itemId === a.id)?.year || 0;
          const yearB = allProducts.find(p => p.itemId === b.id)?.year || 0;

          return yearB - yearA;
        });
        break;

      case 'Alphabetically':
        sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'Cheapest':
        sorted = [...products].sort((a, b) => a.priceRegular - b.priceRegular);
        break;

      default:
        sorted = [...products];
    }

    setSortedProducts(sorted);
  }, [products, sortedBy, allProducts]);

  return (
    <div className={styles.products}>
      <form className={styles.products__form}>
        <div className={styles.products__formElement}>
          <label htmlFor="sortBy" className={styles.products__label}>
            Sort by
          </label>

          <Dropdown
            options={['Newest', 'Alphabetically', 'Cheapest']}
            value={sortedBy}
            onChange={val => setSortedBy(val as string)}
            isSortBy={true}
          />
        </div>

        <div className={`${styles.products__formElement} ${styles['products__formElement--sort']}`}>
          <label htmlFor="itemsPerPage" className={styles.products__label}>
            Items on page
          </label>

          <Dropdown
            options={itemsOnPage}
            value={perPage}
            onChange={val => handlePerPageChange(val)}
            isSortBy={false}
          />
        </div>
      </form>

      <ProductsList currentItems={currentItems} isFavorites={false} isWideCard={true} />

      {perPage !== 'all' && (
        <Pagination
          total={products.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={(p: number) => {
            setPage(p);
          }}
        />
      )}
    </div>
  );
};
