import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './ProductsPage.module.scss';
import { getProducts } from '../shared/services/productService';
import { Card } from '../../components/Card';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { ProductsSortType } from '../../types/ProductsSortType';
import { Card as CardType } from '../../types/Card';
import { Arrow } from '../../components/Arrow';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
}

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<CardType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get('page')
      ? parseInt(searchParams.get('page') as string)
      : 1
  );

  const [perPageValue, setPerPageValue] = useState<ItemsPerPage>(
    searchParams.get('perPage')
      ? searchParams.get('perPage') as ItemsPerPage
      : 'All'
  );

  const [sortType, setSortType] = useState<ProductsSortType>(
    searchParams.get('sort')
      ? searchParams.get('sort') as ProductsSortType
      : 'age'
  );

  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState<boolean>(false);
  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState<boolean>(false);

  const sortValues = ['Newest', 'Alphabetically', 'Chepest'];
  const perPageValues = ['All', 4, 8, 16];

  function changeSearchParams(params: URLSearchParams, key: any, value?: any) {
    const newSearchParams = new URLSearchParams(params);

    if (value) {
      newSearchParams.set(key.toString(), value.toString());
    } else {
      newSearchParams.delete(key.toString());
    }

    setSearchParams(newSearchParams);
  }

  function handlePageChange(value: number) {
    if (value <= 1) {
      setCurrentPage(1);
      changeSearchParams(searchParams, 'page');
      return;
    }

    setCurrentPage(value);
    changeSearchParams(searchParams, 'page', value);
  }

  function handlePerPageChange(value: ItemsPerPage) {
    if (value === 'All') {
      setPerPageValue('All');
      changeSearchParams(searchParams, 'perPage');
      setIsPerPageDropdownOpen(false);
      return;
    }

    setPerPageValue(value);
    changeSearchParams(searchParams, 'perPage', value);
    setIsPerPageDropdownOpen(false);
  }

  function handleSortTypeChange(value: string) {
    switch (value) {
      case 'Newest':
        changeSearchParams(searchParams, 'sort', 'age');
        setSortType('age');
        break;
      case 'Alphabetically':
        changeSearchParams(searchParams, 'sort', 'title');
        setSortType('title');
        break;
      case 'Chepest':
        changeSearchParams(searchParams, 'sort', 'price');
        setSortType('price');
        break;
      default:
        break;
    }

    setIsSortTypeDropdownOpen(false);
  }

  function sortProducts() {
    setProducts(prev => {
      let sorted = [...prev];
      switch (sortType) {
        case 'age':
          sorted.sort((a, b) => b.year - a.year);
          break;
        case 'title':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          sorted.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }
      return sorted;
    });
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

  function createPagination(itemsPerPage: number): number[] {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  useEffect(() => {
    setProducts(
      getProducts()
        .filter(product => product.category === type)
    );
    sortProducts();
    setPerPageValue('All');
    setSortType('age');
    setCurrentPage(1);
  }, [type]);

  useEffect(() => {
    sortProducts();
    setCurrentPage(1);
  }, [perPageValue, sortType]);

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <div className={styles.path}>
          <Link to='/'>
            <img src="/img/icons/Home.svg" alt="Home" />
          </Link>

          <img
            className={styles.right}
            src="/img/icons/arrow-disabled.svg"
            alt="Arrow right"
          />

          <span className={`${styles.pathItem} smallText`}>{type}</span>
        </div>

        <div className={styles.headContent}>
          <h1 className={styles.title}>
            {type}
          </h1>

          <span
            className={`${styles.counter} smallText`}
          >{products.length} models</span>
        </div>

        <div className={styles.sorters}>
          <div className={`${styles.sortType} ${styles.sorter}`}>
            <span className='smallText'>Sort by</span>

            <div className={styles.dropdown}>
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
            <div className={styles.dropdown}>
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

      <div className={styles.products}>
        {products.map(product => (
          <Card key={product.id} card={product} />
        ))}
      </div>

      {perPageValue !== 'All' && (
        <div className={styles.pagination}>
          <Arrow
            direction="left"
            onClick={() => handlePageChange(currentPage - 1)}
          />

          <div className={styles.pages}>
            {createPagination(perPageValue as number).map(page => (
              <button
                onClick={() => handlePageChange(page)}
                className={`
                  ${styles.page}
                  ${currentPage === page ? styles.pageActive : ''}
                `}
              >
                {page}
              </button>
            ))}
          </div>

          <Arrow
            direction="right"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      )}
    </main>
  );
};
