import React, { useState } from 'react';
import { Product } from '../../types/Product';
import styles from './PhonesPage.module.scss';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductDetails } from '../../types/productsDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';

interface PhonesPageProps {
  products: Product[];
  productDetails?: ProductDetails[];
}

export const PhonesPage = ({ products }: PhonesPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const phones = products.filter(product => product.category === 'phones');
  const sortBy = searchParams.get('sort') || 'year';
  const currentPage = Number(searchParams.get('page')) || 1;
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);
  const itemsPerPageParam = searchParams.get('perPage');
  const itemsPerPage =
    itemsPerPageParam === 'all' ? 'all' : Number(itemsPerPageParam) || 16;

  const sortedPhones = [...phones].sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b.year - a.year;
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'discount': {
        const discountA = ((a.fullPrice - a.price) / a.fullPrice) * 100;
        const discountB = ((b.fullPrice - b.price) / b.fullPrice) * 100;

        return discountB - discountA;
      }

      default:
        return 0;
    }
  });

  const effectiveItemsPerPage =
    itemsPerPage === 'all' ? sortedPhones.length : itemsPerPage;
  const totalPages = Math.ceil(sortedPhones.length / effectiveItemsPerPage);
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const currentPhones = sortedPhones.slice(startIndex, endIndex);

  const handleSortToggle = () => {
    setIsSortOpen(prev => !prev);
  };

  const handleItemsPerPageToggle = () => {
    setIsItemsPerPageOpen(prev => !prev);
  };

  const handleSortSelect = (option: 'year' | 'price' | 'name' | 'discount') => {
    const newParams = new URLSearchParams(searchParams);

    if (option === 'year') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', option);
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
    setIsSortOpen(false);
  };

  const handleItemsPerPageSelect = (
    option: '4' | '8' | '16' | '32' | 'all',
  ) => {
    const newParams = new URLSearchParams(searchParams);

    if (option === '16') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', option);
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
    setIsItemsPerPageOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(newPage));
    }

    setSearchParams(newParams);
  };

  const getSortLabel = (type: string) => {
    switch (type) {
      case 'year':
        return 'Newest';
      case 'price':
        return 'Price';
      case 'name':
        return 'Alphabetically';
      case 'discount':
        return 'Discount';
      default:
        return type;
    }
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: 'Phones' }]} />
      <h1>Mobile Phones</h1>
      <p className={styles.itemCount}>{phones.length} items</p>

      {/* дропдауни */}
      <div className={styles.controls}>
        {/* сорт */}
        <div className={styles.controlGroup}>
          <span>Sort by</span>
          <div className={styles.dropdownContainer}>
            <button
              type="button"
              className={`${styles.dropdownButton} ${isSortOpen ? styles.open : ''}`}
              onClick={handleSortToggle}
            >
              <span>{getSortLabel(sortBy)}</span>
              <span className={styles.arrow}></span>
            </button>

            {isSortOpen && (
              <div className={styles.dropdownMenu}>
                <button type="button" onClick={() => handleSortSelect('year')}>
                  Newest
                </button>
                <button type="button" onClick={() => handleSortSelect('price')}>
                  Price
                </button>
                <button type="button" onClick={() => handleSortSelect('name')}>
                  Alphabetically
                </button>
                <button
                  type="button"
                  onClick={() => handleSortSelect('discount')}
                >
                  Discount
                </button>
              </div>
            )}
          </div>
        </div>

        {/* кількість елементів на сторінці */}
        <div className={styles.controlGroup}>
          <span>Items on page</span>
          <div className={styles.dropdownContainer}>
            <button
              type="button"
              className={`${styles.dropdownButton} ${isItemsPerPageOpen ? styles.open : ''}`}
              onClick={handleItemsPerPageToggle}
            >
              <span>{itemsPerPage}</span>
              <span className={styles.arrow}></span>
            </button>

            {isItemsPerPageOpen && (
              <div className={styles.dropdownMenu}>
                <button
                  type="button"
                  onClick={() => handleItemsPerPageSelect('4')}
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={() => handleItemsPerPageSelect('8')}
                >
                  8
                </button>
                <button
                  type="button"
                  onClick={() => handleItemsPerPageSelect('16')}
                >
                  16
                </button>
                <button
                  type="button"
                  onClick={() => handleItemsPerPageSelect('32')}
                >
                  32
                </button>
                <button
                  type="button"
                  onClick={() => handleItemsPerPageSelect('all')}
                >
                  All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* сітка товарів */}
      <div className={styles.grid}>
        {currentPhones.map(phone => (
          <ProductCard product={phone} key={phone.id} />
        ))}
      </div>

      {/* компоненти пагінації */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
