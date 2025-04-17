import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './ProductCatalog.module.scss';

import productsList from '../../../../public/api/products.json';

import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { ProductSkeleton } from '../ProductSkeleton/ProductSkeleton';

import ArrowRight from 'assets/icons/ArrowRight.svg?react';

import { Product } from '@/types/product';
import { sortOptionType } from '@/types/sortOptionType';

export const ProductCatalog: React.FC = () => {
  // #region State and Refs
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<sortOptionType>('newest');
  const [perPage, setPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);
  // #endregion

  useEffect(() => {
    const phones = productsList.filter(
      product => product.category === 'phones',
    );

    setProducts(phones);
    setFilteredProducts(phones);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const sort = searchParams.get('sort');
    const per = searchParams.get('perPage');

    if (sort && ['newest', 'alphabetically', 'cheapest'].includes(sort)) {
      setSortOption(sort as sortOptionType);
    }

    if (per && [4, 8, 16].includes(parseInt(per, 10))) {
      setPerPage(parseInt(per, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    const sorted = [...products];

    switch (sortOption) {
      case 'newest':
        sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case 'alphabetically':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'cheapest':
        sorted.sort(
          (a, b) => (a.price || a.fullPrice) - (b.price || b.fullPrice),
        );
        break;
    }

    setFilteredProducts(sorted);
  }, [sortOption, products]);

  // #region Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }

      if (
        perPageRef.current &&
        !perPageRef.current.contains(event.target as Node)
      ) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // #endregion

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  // #region Handlers
  const handleSortChange = (value: sortOptionType) => {
    setSortOption(value);
    setSearchParams(prev => {
      prev.set('sort', value);

      return prev;
    });
    setIsSortOpen(false);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
    setSearchParams(prev => {
      prev.set('perPage', value.toString());

      return prev;
    });
    setIsPerPageOpen(false);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  // #endregion

  // #region Dropdown Options
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetically', label: 'Alphabetically' },
    { value: 'cheapest', label: 'Cheapest' },
  ];

  const perPageOptions = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
  ];
  // #endregion

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.counterModels}>{filteredProducts.length} models</p>

      <div className={styles.controlsWrapper}>
        <div className={styles.sortContainer}>
          <p className={styles.sortDescription}>Sort by</p>
          <div className={styles.selectWrapper} ref={sortRef}>
            <div
              className={styles.controlSelect}
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {sortOptions.find(opt => opt.value === sortOption)?.label}
              <ArrowRight
                className={`${styles.selectArrow} ${
                  isSortOpen ? styles.selectArrowOpen : ''
                }`}
              />
            </div>
            {isSortOpen && (
              <ul className={styles.dropdownList}>
                {sortOptions.map(option => (
                  <li
                    key={option.value}
                    className={`${styles.dropdownItem} ${
                      sortOption === option.value
                        ? styles.dropdownItemSelected
                        : ''
                    }`}
                    onClick={() =>
                      handleSortChange(option.value as sortOptionType)
                    }
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.filterContainer}>
          <p className={styles.filterDescription}>Items on page</p>
          <div className={styles.selectWrapper} ref={perPageRef}>
            <div
              className={styles.controlSelect}
              onClick={() => setIsPerPageOpen(!isPerPageOpen)}
            >
              {perPage}
              <ArrowRight
                className={`${styles.selectArrow} ${
                  isPerPageOpen ? styles.selectArrowOpen : ''
                }`}
              />
            </div>
            {isPerPageOpen && (
              <ul className={styles.dropdownList}>
                {perPageOptions.map(option => (
                  <li
                    key={option.value}
                    className={`${styles.dropdownItem} ${
                      perPage === option.value
                        ? styles.dropdownItemSelected
                        : ''
                    }`}
                    onClick={() => handlePerPageChange(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={styles.productGridContainer}>
        {isLoading ? (
          Array.from({ length: perPage }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : currentItems.length > 0 ? (
          currentItems.map(product => (
            <div key={product.id} className={styles.productItem}>
              <ProductCard isShowFullPrice={true} product={product} />
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      <Pagination
        total={filteredProducts.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
