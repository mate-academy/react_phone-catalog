import React, { useMemo, useState } from 'react';
import styles from './PhonesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';
import { Breadcrumb } from '../../components/Breadcrumb';
import { CustomDropdown } from '../../components/CustomDropdown';
import { useProduct } from '../../hooks/useProduct';
import { useErrorHandling } from '../../hooks/errorHandling';

const sortProducts = (products: Product[], sortBy: string): Product[] => {
  switch (sortBy) {
    case 'alphabetically':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case 'priceLow':
      return [...products].sort((a, b) => a.priceDiscount - b.priceDiscount);
    case 'priceHigh':
      return [...products].sort((a, b) => b.priceDiscount - a.priceDiscount);
    case 'newest':
    default:
      return [...products].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }
};

export const PhonesPage: React.FC = () => {
  const { setIsError } = useErrorHandling();
  const { product } = useProduct(() => setIsError(true));
  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const phones = useMemo(() => {
    return product.filter(producPhone => producPhone.category === 'phones');
  }, [product]);

  const sortedPhones = useMemo(() => {
    return sortProducts(phones, sortBy);
  }, [phones, sortBy]);

  const paginatedPhones = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return sortedPhones.slice(start, start + itemsPerPage);
  }, [sortedPhones, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(phones.length / itemsPerPage);

  return (
    <div className={styles.phonesPage}>
      <Breadcrumb current="Phones" />
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Mobile Phones</h1>
        <span className={styles.count}>{phones.length} models</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <CustomDropdown
            label="Sort by"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'name', label: 'Name' },
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
            onChange={value => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
            options={[
              { value: '4', label: '4' },
              { value: '8', label: '8' },
              { value: '16', label: '16' },
            ]}
          />
        </div>
      </div>

      {paginatedPhones.length === 0 ? (
        <p className={styles.empty}>No phones available.</p>
      ) : (
        <ul className={styles.list}>
          {paginatedPhones.map(productPhone => (
            <li key={productPhone.id} className={styles.item}>
              <ProductCard product={productPhone} showFullPrice />
            </li>
          ))}
        </ul>
      )}

      {/* Pagination controls (optional) */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className={styles.arrowButton}
            disabled={currentPage === 1}
          >
            <img
              src="/react_phone-catalog/img/icons/arrow-left.svg"
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
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? styles.pageButtonActive
                    : styles.pageButton
                }
              >
                {page}
              </button>
            ))}

          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            className={styles.arrowButton}
            disabled={currentPage === totalPages}
          >
            <img
              src="/react_phone-catalog/img/icons/arrow-right.svg"
              alt="Next"
            />
          </button>
        </div>
      )}
    </div>
  );
};
