import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductsPage.module.scss';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { ProductsSortType } from '../../types/ProductsSortType';
import { Arrow } from '../../components/Arrow';
import { ProductsList } from '../../components/ProductsList';
import { useAppContext } from '../../contexts/AppContext';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Card } from '../../types/Card';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
}

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [currentPages, setCurrentPages] = useState<number[]>([]);
  const { searchParams, products, isLoading } = useAppContext();
  const sortDropDownRef = useRef<HTMLDivElement>(null);
  const perPageDropDownRef = useRef<HTMLDivElement>(null);

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

  const [sortType, setSortType] = useState<ProductsSortType>(getSortTypeFromParams());
  const [currentPage, setCurrentPage] = useState<number>(getPageFromParams());
  const [perPageValue, setPerPageValue] = useState<ItemsPerPage>(getPerPageFromParams());

  function sorter(a: Card, b: Card) {
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
  }

  const [currentProducts, setCurrentProducts] = useState<Card[]>(
    products
      .filter(product => product.category === type)
      .sort(sorter)
  );

  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState<boolean>(false);
  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState<boolean>(false);

  const sortValues = ['Newest', 'Alphabetically', 'Chepest'];
  const perPageValues = ['All', 4, 8, 16];

  // function changeSearchParams(params: URLSearchParams, key: any, value?: any) {
  //   const newSearchParams = new URLSearchParams(params);

  //   if (value !== undefined && value !== null) {
  //     params.set(key.toString(), value.toString());
  //   } else {
  //     params.delete(key.toString());
  //   }

  //   setSearchParams(newSearchParams);
  // }

  function createPagination(items: number, from = 1) {
    const to = Math.ceil(currentProducts.length / items);
    const pages: number[] = [];

    for (let i = from; i <= Math.min(from + 4, to); i++) {
      pages.push(i);
    }

    setCurrentPages(pages);
  }

  function handlePageChange(value?: number) {
    if (typeof perPageValue === 'string') return;

    if (!value) {
      createPagination(
        perPageValue,
        currentPages[currentPages.length - 1] + 1,
      );
      setCurrentPage(currentPages[currentPages.length - 1] + 1);
      return;
    }

    if (currentPages[currentPages.length - 1] < value) {
      createPagination(perPageValue, value);
      setCurrentPage(value);
      return;
    }

    if (currentPages[0] > value) {
      createPagination(perPageValue, Math.max(value - 4, 1));
      setCurrentPage(value);
      return;
    }

    setCurrentPage(value);
  }

  function handlePerPageChange(value: ItemsPerPage) {
    if (value === 'All') {
      setPerPageValue('All');
      setIsPerPageDropdownOpen(false);
      return;
    }

    setPerPageValue(value);
    setIsPerPageDropdownOpen(false);
  }

  function handleSortTypeChange(value: string) {
    switch (value) {
      case 'Newest':
        setSortType('age');
        break;
      case 'Alphabetically':
        setSortType('title');
        break;
      case 'Chepest':
        setSortType('price');
        break;
      default:
        break;
    }

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
      const filtered = products
        .filter(product => product.category === type)
        .sort(sorter);

      setCurrentProducts(filtered);
      setCurrentPage(1);
      setSortType('age');
      setPerPageValue('All');
      setIsPerPageDropdownOpen(false);
      setIsSortTypeDropdownOpen(false);
    }
  }, [type, products]);

  useEffect(() => {
    setCurrentProducts(prevProducts => [...prevProducts].sort(sorter));
    setCurrentPage(1);

    if (typeof perPageValue === 'number') {
      createPagination(perPageValue);
    }
  }, [perPageValue, sortType]);

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
            <span className='smallText'>Sort by</span>

            <div
              ref={sortDropDownRef}
              className={styles.dropdown}
            >
              <button
                onClick={() => setIsSortTypeDropdownOpen(prev => !prev)}
                className={`
                  ${styles.dropdownTrigger} 
                  ${isSortTypeDropdownOpen ? styles.dropdownTriggerActive : ''}
                `}
              >
                {getSortTypeValue(sortType)}
                <span className={styles.arrowContainer}>
                  <img
                    className={!isSortTypeDropdownOpen ? styles.down : ''}
                    src="/img/icons/arrow-disabled.svg"
                    alt={`Arrow ${isSortTypeDropdownOpen ? 'up' : 'down'}`}
                  />
                </span>
              </button>

              {isSortTypeDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {sortValues.map(type => (
                    <a
                      key={type}
                      onClick={() => handleSortTypeChange(type as ProductsSortType)}
                      className={`${styles.dropdownItem} bodyText`}
                    >{type}</a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.perPageItems} ${styles.sorter}`}>
            <span className='smallText'>Items on page</span>
            <div
              ref={perPageDropDownRef}
              className={styles.dropdown}
            >
              <button
                onClick={() => setIsPerPageDropdownOpen(prev => !prev)}
                className={`
                  ${styles.dropdownTrigger} 
                  ${isPerPageDropdownOpen ? styles.dropdownTriggerActive : ''}
                `}
              >
                {perPageValue}
                <span className={styles.arrowContainer}>
                  <img
                    className={!isSortTypeDropdownOpen ? styles.down : ''}
                    src="/img/icons/arrow-disabled.svg"
                    alt={`Arrow ${isPerPageDropdownOpen ? 'up' : 'down'}`}
                  />
                </span>
              </button>

              {isPerPageDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {perPageValues.map(value => (
                    <a
                      key={value}
                      onClick={() => {
                        handlePerPageChange(value as ItemsPerPage);
                      }}
                      className={`${styles.dropdownItem} bodyText`}
                    >{value}</a>
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
          <Arrow
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

          <Arrow
            direction="right"
            isDisabled={currentPage === Math.ceil(currentProducts.length / perPageValue)}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      )}
    </main>
  );
};
