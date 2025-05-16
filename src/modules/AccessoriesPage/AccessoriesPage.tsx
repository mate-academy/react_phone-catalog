import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsList from '../../components/ProductsList/ProductsList';
import Loader from '../../components/Loader/Loader';
import { Product } from '../../types/Product';
import styles from './AccessoriesPage.module.scss';

const AccessoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || 'age';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const perPageParam = searchParams.get('perPage') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  interface RawAccessory {
    id: string;
    name: string;
    priceRegular: number;
    priceDiscount: number;
    images: string[];
    screen?: string;
    capacity?: string;
    color?: string;
    ram?: string;
    year?: number;
  }

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/accessories.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch accessories data');
        }

        return response.json();
      })
      .then(data => {
        setProducts(
          data.map((accessory: RawAccessory) => ({
            id: accessory.id,
            name: accessory.name,
            fullPrice: accessory.priceRegular,
            price: accessory.priceDiscount,
            image: accessory.images || '',
            category: 'accessories',
            screen: accessory.screen || 'Unknown Screen',
            capacity: accessory.capacity || 'Unknown Capacity',
            color: accessory.color || 'Unknown Color',
            ram: accessory.ram || 'Unknown RAM',
            year: accessory.year || new Date().getFullYear(),
          })),
        );
        setIsLoading(false);
        setHasError(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const sortedProducts = [...products];

  if (sortParam === 'age') {
    sortedProducts.sort((a, b) => b.year - a.year);
  } else if (sortParam === 'title') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortParam === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  let perPage = sortedProducts.length;

  if (perPageParam !== 'all') {
    perPage = parseInt(perPageParam, 10);
  }

  let currentPage = pageParam;
  const totalPages =
    perPageParam === 'all' ? 1 : Math.ceil(sortedProducts.length / perPage);

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  /*eslint-disable-next-line max-len*/

  let displayedProducts: Product[];

  if (perPageParam === 'all') {
    displayedProducts = sortedProducts;
  } else {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = currentPage * perPage;

    displayedProducts = sortedProducts.slice(startIndex, endIndex);
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', value);
    setSearchParams(params);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', value);
      params.delete('page');
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', newPage.toString());
    }

    setSearchParams(params);
  };

  return (
    <div className={styles.accessoriesPage}>
      <h1>Accessories Page</h1>
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <div className={styles.error}>
          <p>Something went wrong.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      ) : products.length === 0 ? (
        <p>There are no accessories yet.</p>
      ) : (
        <>
          <div className={styles.controls}>
            <label>
              Sort By:{' '}
              <select value={sortParam} onChange={handleSortChange}>
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>
            <label>
              Items per page:{' '}
              <select value={perPageParam} onChange={handlePerPageChange}>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </label>
          </div>
          <ProductsList products={displayedProducts} />
          {perPageParam !== 'all' && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccessoriesPage;
