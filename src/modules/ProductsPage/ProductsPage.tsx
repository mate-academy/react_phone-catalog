import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ProductsPage.module.scss';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { ProductsSortType } from '../../types/ProductsSortType';
import { ArrowButton } from '../../components/Arrow/ArrowButton';
import { ProductsList } from '../../components/ProductsList';
import { useAppState, useAppDispatch } from '../../contexts/AppContext';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Card } from '../../types/Card';
import { Arrow } from '../../components/Arrow/Arrow';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
}

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [currentPages, setCurrentPages] = useState<number[]>([]);

  const sortDropDownRef = useRef<HTMLDivElement>(null);
  const perPageDropDownRef = useRef<HTMLDivElement>(null);

  const [currentProducts, setCurrentProducts] = useState<Card[]>([]);

  const sortValues = ['Newest', 'Alphabetically', 'Chepest'];
  const perPageValues = ['All', 4, 8, 16];

  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState<boolean>(false);
  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState<boolean>(false);

  const {
    searchParams,
    products,
    isLoading,
  } = useAppState();

  const { setSearchParams } = useAppDispatch();

  function getPerPageFromParams() {
    const value = searchParams.get('perPage');
    if (value === null) return 'All';
    if (value === 'All') return 'All';
    const num = Number(value);
    if ([4, 8, 16].includes(num)) return num as ItemsPerPage;
    return 'All';
  };

  function getSortTypeFromParams() {
    const value = searchParams.get('sort');
    if (value === 'title' || value === 'price' || value === 'age') {
      return value as ProductsSortType;
    }
    return 'age';
  };

  function getPageFromParams() {
    const value = searchParams.get('page');
    if (!value) return 1;
    const num = parseInt(value, 10);
    return isNaN(num) || num < 1 ? 1 : num;
  };

  const sortType = getSortTypeFromParams();
  const currentPage = getPageFromParams();
  const perPageValue = getPerPageFromParams();

  const sorter = useCallback((a: Card, b: Card) => {
    switch (sortType) {
      case 'age':
        if (a.year === b.year) {
          return b.name.localeCompare(a.name);
        } else {
          return b.year - a.year;
        }
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  }, [sortType]);

  function changeSearchParams(key: any, value?: any) {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value !== undefined && value !== null) {
      newSearchParams.set(key.toString(), value.toString());
    } else {
      newSearchParams.delete(key.toString());
    }

    setSearchParams(newSearchParams);
  }

  function createPagination(items: number, from = 1) {
    const to = Math.ceil(currentProducts.length / items);
    const pages: number[] = [];

    for (let i = from; i <= Math.min(from + 4, to); i++) {
      pages.push(i);
    }

    setCurrentPages(pages);
  }

  function handlePageChange(value?: number) {
    if (value === 1) {
      changeSearchParams('page');
      return;
    }
    if (typeof perPageValue === 'string') return;

    if (!value) {
      createPagination(
        perPageValue,
        currentPages[currentPages.length - 1] + 1,
      );
      changeSearchParams('page', currentPages[currentPages.length - 1] + 1);
      return;
    }

    if (currentPages[currentPages.length - 1] < value) {
      createPagination(perPageValue, value);
      changeSearchParams('page', value);
      return;
    }

    if (currentPages[0] > value) {
      createPagination(perPageValue, Math.max(value - 4, 1));
      changeSearchParams('page', value);
      return;
    }

    changeSearchParams('page', value);
  }

  function handlePerPageChange(value: ItemsPerPage) {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      if (value === 'All') {
        p.delete('perPage');
      } else {
        p.set('perPage', String(value));
      }
      p.delete('page');
      return p;
    });
    setIsPerPageDropdownOpen(false);
  }

  function handleSortTypeChange(value: string) {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      switch (value) {
        case 'Newest':
          p.delete('sort');
          break;
        case 'Alphabetically':
          p.set('sort', 'title');
          break;
        case 'Chepest':
          p.set('sort', 'price');
          break;
        default:
          break;
      }
      p.delete('page');
      return p;
    });
    setIsSortTypeDropdownOpen(false);
  }

  function getSortTypeValue(type: ProductsSortType): string {
    switch (type) {
      case 'age':
        return 'Newest';
      case 'title':
        return 'Alphabetically';
      case 'price':
        return 'Chepest';
      default:
        return '';
    }
  }

  function hasNextPaginationPage(): boolean {
    if (typeof perPageValue === 'string') return false;

    if (
      currentPages[currentPages.length - 1] ===
      Math.ceil(currentProducts.length / perPageValue)
    ) {
      return false;
    }

    if (currentPages.length < 5) return false;

    return true;
  }

  useEffect(() => {
    if (!isLoading) {
      const filteredProducts = products
        .filter(product => product.category === type);

      const sortedProducts = [...filteredProducts].sort(sorter);

      setCurrentProducts(sortedProducts);
    }
  }, [products, type, sortType, isLoading, sorter]);

  useEffect(() => {
    if (typeof perPageValue === 'number' && currentProducts.length > 0) {
      const initialPageBlockStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
      createPagination(perPageValue, initialPageBlockStart);
    }
  }, [currentProducts, perPageValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <Breadcrumb />

        <div className={styles.headContent}>
          <h1 className={styles.title}>
            {type}
          </h1>

          <span
            className={`${styles.counter} smallText`}
          >{currentProducts.length} models</span>
        </div>

        <div className={styles.sorters}>
          <div className={`${styles.sortType} ${styles.sorter}`}>
            <span className={`${styles.counter} smallText`}>Sort by</span>

            <div
              ref={sortDropDownRef}
              className={styles.dropdown}
            >
              <button
                type="button"
                onClick={() => setIsSortTypeDropdownOpen(prev => !prev)}
                className={`
                  ${styles.dropdownTrigger} 
                  ${isSortTypeDropdownOpen ? styles.dropdownTriggerActive : ''}
                `}
              >
                {getSortTypeValue(sortType)}
                <span className={styles.arrowContainer}>
                  <Arrow direction='down' isDisabled={true} />
                </span>
              </button>

              {isSortTypeDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {sortValues.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSortTypeChange(type as ProductsSortType)}
                      className={`${styles.dropdownItem} bodyText`}
                    >{type}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.perPageItems} ${styles.sorter}`}>
            <span className={`${styles.counter} smallText`}>Items on page</span>
            <div
              ref={perPageDropDownRef}
              className={styles.dropdown}
            >
              <button
                type="button"
                onClick={() => setIsPerPageDropdownOpen(prev => !prev)}
                className={`
                  ${styles.dropdownTrigger} 
                  ${isPerPageDropdownOpen ? styles.dropdownTriggerActive : ''}
                `}
              >
                {perPageValue}
                <span className={styles.arrowContainer}>
                  <Arrow direction='down' isDisabled={true} />
                </span>
              </button>

              {isPerPageDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {perPageValues.map(value => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handlePerPageChange(value as ItemsPerPage)}
                      className={`${styles.dropdownItem} bodyText`}
                    >{value}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductsList
        products={
          perPageValue === 'All'
            ? isLoading
              ? Array(8).fill(undefined)
              : currentProducts
            : currentProducts.slice(
              (currentPage - 1) * Number(perPageValue),
              currentPage * Number(perPageValue)
            )
        }
      />

      {perPageValue !== 'All' && (
        <div className={styles.pagination}>
          <ArrowButton
            direction="left"
            isDisabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />

          <div className={styles.pages}>
            {currentPages.map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  ${styles.page}
                  ${currentPage === page ? styles.pageActive : ''}
                `}
              >
                {page}
              </button>
            ))}

            {hasNextPaginationPage() && (
              <button
                onClick={() => handlePageChange()}
                className={`
                ${styles.page}
              `}
              >
                ...
              </button>
            )}
          </div>

          <ArrowButton
            direction="right"
            isDisabled={currentPage === Math.ceil(currentProducts.length / perPageValue)}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      )}
    </main>
  );
};
