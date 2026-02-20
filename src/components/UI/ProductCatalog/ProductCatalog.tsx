import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductCatalog.module.scss';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { ProductSkeleton } from '../ProductSkeleton/ProductSkeleton';
import ArrowRight from 'assets/icons/ArrowRight.svg?react';
import { Product } from '@/types/product';
import { SortOptionType } from '@/types/sortOptionType';
import { useTranslation } from 'react-i18next';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';
import { Loader } from '../Loader';

type Props = {
  title: string;
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
};

export const ProductCatalog: React.FC<Props> = ({
  title,
  products,
  isLoading: parentIsLoading = false,
  error,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<SortOptionType>('newest');
  const [perPage, setPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    setFilteredProducts(products);
    setIsLoading(parentIsLoading);
  }, [products, parentIsLoading]);

  useEffect(() => {
    const sort = searchParams.get('sort');
    const per = searchParams.get('perPage');
    const page = searchParams.get('page');

    if (sort && ['newest', 'alphabetically', 'cheapest'].includes(sort)) {
      setSortOption(sort as SortOptionType);
    } else {
      setSortOption('newest');
    }

    if (per && [4, 8, 16].includes(parseInt(per, 10))) {
      setPerPage(parseInt(per, 10));
    } else {
      setPerPage(16);
    }

    if (page && !isNaN(parseInt(page, 10))) {
      setCurrentPage(parseInt(page, 10));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [sortOption, products]);

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

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return filteredProducts.slice(startIndex, endIndex);
  }, [currentPage, perPage, filteredProducts]);

  const handleSortChange = (value: SortOptionType) => {
    setSearchParams(
      prev => {
        prev.set('sort', value);
        prev.delete('page');

        return prev;
      },
      { replace: true },
    );
    setIsSortOpen(false);
  };

  const handlePerPageChange = (value: number) => {
    setSearchParams(
      prev => {
        prev.set('perPage', value.toString());
        prev.delete('page');

        return prev;
      },
      { replace: true },
    );
    setIsPerPageOpen(false);
  };

  const onPageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', page.toString());
    }

    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortOptions = [
    { value: 'newest', key: 'newest' },
    { value: 'alphabetically', key: 'alphabetically' },
    { value: 'cheapest', key: 'cheapest' },
  ];

  const perPageOptions = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.counterModels}>
        {t('categories.models', { count: filteredProducts.length })}
      </p>

      <div className={styles.controlsWrapper}>
        <div className={styles.sortContainer}>
          <p className={styles.sortDescription}>{t('controls.sortBy')}</p>
          <div className={styles.selectWrapper} ref={sortRef}>
            <div
              className={styles.controlSelect}
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {t(`controls.sortOptions.${sortOption}`)}
              <ArrowRight
                className={`${styles.selectArrow} ${isSortOpen ? styles.selectArrowOpen : ''}`}
              />
            </div>
            {isSortOpen && (
              <ul className={styles.dropdownList}>
                {sortOptions.map(option => (
                  <li
                    key={option.value}
                    className={`${styles.dropdownItem} ${sortOption === option.value ? styles.dropdownItemSelected : ''}`}
                    onClick={() =>
                      handleSortChange(option.value as SortOptionType)
                    }
                  >
                    {t(`controls.sortOptions.${option.key}`)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.filterContainer}>
          <p className={styles.filterDescription}>
            {t('controls.itemsOnPage')}
          </p>
          <div className={styles.selectWrapper} ref={perPageRef}>
            <div
              className={styles.controlSelect}
              onClick={() => setIsPerPageOpen(!isPerPageOpen)}
            >
              {perPage}
              <ArrowRight
                className={`${styles.selectArrow} ${isPerPageOpen ? styles.selectArrowOpen : ''}`}
              />
            </div>
            {isPerPageOpen && (
              <ul className={styles.dropdownList}>
                {perPageOptions.map(option => (
                  <li
                    key={option.value}
                    className={`${styles.dropdownItem} ${perPage === option.value ? styles.dropdownItemSelected : ''}`}
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
        {error ? (
          <ErrorComponent message={error} />
        ) : isLoading ? (
          Array.from({ length: perPage }).map((_, index) => (
            <div key={index} className={styles.productItem}>
              <ProductSkeleton />
            </div>
          ))
        ) : currentItems.length > 0 ? (
          currentItems.map(product => (
            <div key={product.id} className={styles.productItem}>
              <ProductCard isShowFullPrice={true} product={product} />
            </div>
          ))
        ) : (
          <div className={styles.productsNotFoundWrapper}>
            <Loader />
            <p className={styles.productsNotFoundText}>
              {t('controls.noProducts')}
            </p>
          </div>
        )}
      </div>

      {!isLoading && !error && filteredProducts.length > perPage && (
        <Pagination
          total={filteredProducts.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
