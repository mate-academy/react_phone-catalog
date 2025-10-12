/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ProductsPage.module.scss';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { ProductsSortType } from '../../types/ProductsSortType';
import { ArrowButton } from '../../components/Arrow/ArrowButton';
import { ProductsList } from '../../components/ProductsList';
import { useAppState, useAppDispatch } from '../../Context/AppContext';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Card } from '../../types/Card';
import { Arrow } from '../../components/Arrow/Arrow';
import { useOnClickOutside } from '../Base/hooks/useOnClickOutside';
import { getTranslation } from '../Base/utils/getTranslation';
import debounce from 'lodash.debounce';
import { Close } from '../../components/Close';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
};

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [currentPages, setCurrentPages] = useState<number[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Card[]>([]);

  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] =
    useState<boolean>(false);
  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] =
    useState<boolean>(false);

  const sortDropDownRef = useRef<HTMLDivElement>(null);
  const perPageDropDownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);
  const { searchParams, products, language, isLoadingProducts } = useAppState();

  const { setSearchParams, fetchProducts } = useAppDispatch();
  const t = getTranslation(language);

  const sortValues = [
    t.productsPage.newest,
    t.productsPage.alphabetically,
    t.productsPage.cheapest,
  ];
  const perPageValues = [t.productsPage.all, 4, 8, 16];

  function getPerPageFromParams() {
    const value = searchParams.get('perPage');

    if (value === null) {
      return 'All';
    }

    if (value === 'All') {
      return 'All';
    }

    const num = Number(value);

    if ([4, 8, 16].includes(num)) {
      return num as ItemsPerPage;
    }

    return 'All';
  }

  function getSortTypeFromParams() {
    const value = searchParams.get('sort');

    if (value === 'title' || value === 'price' || value === 'age') {
      return value as ProductsSortType;
    }

    return 'age';
  }

  function getPageFromParams() {
    const value = searchParams.get('page');

    if (!value) {
      return 1;
    }

    const num = parseInt(value, 10);

    return isNaN(num) || num < 1 ? 1 : num;
  }

  function getFilterFromParams() {
    const value = searchParams.get('search');

    if (!value) {
      return '';
    }

    return value;
  }

  const sortType = getSortTypeFromParams();
  const currentPage = getPageFromParams();
  const perPageValue = getPerPageFromParams();
  const [filter, setFilter] = useState<string>(getFilterFromParams());
  const [searchValue, setSearchValue] = useState<string>(getFilterFromParams());

  const sorter = useCallback(
    (a: Card, b: Card) => {
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
    },
    [sortType],
  );

  function changeSearchParams(key: string, value?: string | number) {
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

    if (typeof perPageValue === 'string') {
      return;
    }

    if (!value) {
      createPagination(perPageValue, currentPages[currentPages.length - 1] + 1);
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

      if (value === t.productsPage.all) {
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
        case t.productsPage.newest:
          p.delete('sort');
          break;
        case t.productsPage.alphabetically:
          p.set('sort', 'title');
          break;
        case t.productsPage.cheapest:
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

  function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setSearchValue(value);
    changeFilter(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setSearchValue('');
      changeFilter('');
      filterRef.current?.blur();
    }
  }

  const changeFilter = useCallback(
    debounce((value: string) => {
      setFilter(value);

      if (value === '') {
        changeSearchParams('search');
      } else {
        changeSearchParams('search', value);
      }
    }, 500),
    [changeSearchParams],
  );

  function getSortTypeValue(type: ProductsSortType): string {
    switch (type) {
      case 'age':
        return t.productsPage.newest;
      case 'title':
        return t.productsPage.alphabetically;
      case 'price':
        return t.productsPage.cheapest;
      default:
        return '';
    }
  }

  function hasNextPaginationPage(): boolean {
    if (typeof perPageValue === 'string') {
      return false;
    }

    if (
      currentPages[currentPages.length - 1] ===
      Math.ceil(currentProducts.length / perPageValue)
    ) {
      return false;
    }

    if (currentPages.length < 5) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (!isLoadingProducts) {
      const filteredProducts = products
        .filter(product => product.category === type)
        .filter(product =>
          product.name.toLowerCase().includes(filter.toLowerCase()),
        );

      const sortedProducts = [...filteredProducts].sort(sorter);

      setCurrentProducts(sortedProducts);
    }
  }, [products, type, sortType, isLoadingProducts, sorter, filter]);

  useEffect(() => {
    if (typeof perPageValue === 'number' && currentProducts.length > 0) {
      const initialPageBlockStart = Math.floor((currentPage - 1) / 5) * 5 + 1;

      createPagination(perPageValue, initialPageBlockStart);
    }
  }, [currentProducts, perPageValue]);
  useEffect(() => {
    window.scrollTo(0, 0);

    const urlFilter = getFilterFromParams();

    setFilter(urlFilter);
    setSearchValue(urlFilter);
  }, [type]);
  useOnClickOutside(sortDropDownRef, () => setIsSortTypeDropdownOpen(false));
  useOnClickOutside(perPageDropDownRef, () => setIsPerPageDropdownOpen(false));

  return (
    <main className={styles.main}>
      {!isLoadingProducts && products.length === 0 ? (
        <>
          <div className={styles.head}>
            <Breadcrumb />
            <div className={styles.headContent}>
              <h2 className={styles.title}>
                {type === 'phones'
                  ? t.productsPage.phones
                  : type === 'tablets'
                    ? t.productsPage.tablets
                    : t.productsPage.accessories}
              </h2>
              <span className={`${styles.counter} smallText`}>
                0 {t.categories.models}
              </span>
            </div>
          </div>

          <div className={styles.notFound}>
            <h3>{t.productsPage.somethingWentWrong}</h3>

            <button
              type="button"
              onClick={fetchProducts}
              className={styles.notFoundButton}
            >
              <svg
                className={styles.notFoundIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M552 256L408 256C398.3 256 389.5 250.2 385.8 241.2C382.1 232.2 384.1 221.9 391 215L437.7 168.3C362.4 109.7 253.4 115 184.2 184.2C109.2 259.2 109.2 380.7 184.2 455.7C259.2 530.7 380.7 530.7 455.7 455.7C463.9 447.5 471.2 438.8 477.6 429.6C487.7 415.1 507.7 411.6 522.2 421.7C536.7 431.8 540.2 451.8 530.1 466.3C521.6 478.5 511.9 490.1 501 501C401 601 238.9 601 139 501C39.1 401 39 239 139 139C233.3 44.7 382.7 39.4 483.3 122.8L535 71C541.9 64.1 552.2 62.1 561.2 65.8C570.2 69.5 576 78.3 576 88L576 232C576 245.3 565.3 256 552 256z" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.head}>
            <Breadcrumb />

            <div className={styles.headContent}>
              <h2 className={styles.title}>
                {type === 'phones'
                  ? t.productsPage.phones
                  : type === 'tablets'
                    ? t.productsPage.tablets
                    : t.productsPage.accessories}
              </h2>

              <span className={`${styles.counter} smallText`}>
                {currentProducts.length} {t.categories.models}
              </span>
            </div>

            <div className={styles.sorters}>
              <div className={`${styles.sortType} ${styles.sorter}`}>
                <span className={`${styles.counter} smallText`}>
                  {t.productsPage.sortBy}
                </span>

                <div ref={sortDropDownRef} className={styles.dropdown}>
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
                      <Arrow direction="down" isDisabled={true} />
                    </span>
                  </button>

                  {isSortTypeDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      {sortValues.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            handleSortTypeChange(type as ProductsSortType)
                          }
                          className={`${styles.dropdownItem} bodyText`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={`${styles.perPageItems} ${styles.sorter}`}>
                <span className={`${styles.counter} smallText`}>
                  {t.productsPage.itemsOnPage}
                </span>
                <div ref={perPageDropDownRef} className={styles.dropdown}>
                  <button
                    type="button"
                    onClick={() => setIsPerPageDropdownOpen(prev => !prev)}
                    className={`
                      ${styles.dropdownTrigger}
                      ${isPerPageDropdownOpen ? styles.dropdownTriggerActive : ''}
                    `}
                  >
                    {perPageValue === 'All' ? t.productsPage.all : perPageValue}
                    <span className={styles.arrowContainer}>
                      <Arrow direction="down" isDisabled={true} />
                    </span>
                  </button>

                  {isPerPageDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      {perPageValues.map(value => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            handlePerPageChange(value as ItemsPerPage)
                          }
                          className={`${styles.dropdownItem} bodyText`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.sorter}>
                <span className={`${styles.counter} smallText`}>
                  {t.productsPage.filterPlaceholder}
                </span>

                <div className={styles.filter}>
                  <input
                    ref={filterRef}
                    type="text"
                    value={searchValue}
                    placeholder={t.productsPage.filterPlaceholder}
                    onChange={handleSearchValueChange}
                    onKeyDown={handleKeyDown}
                    className={`${styles.filterInput} ${styles.dropdown}`}
                  />

                  {searchValue && (
                    <Close
                      onClick={() => {
                        setSearchValue('');
                        changeFilter('');
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <ProductsList
            products={
              isLoadingProducts
                ? Array(8).fill(undefined)
                : perPageValue === 'All'
                  ? currentProducts.filter(product =>
                      product.name.toLowerCase().includes(filter.toLowerCase()),
                    )
                  : currentProducts
                      .filter(product =>
                        product.name
                          .toLowerCase()
                          .includes(filter.toLowerCase()),
                      )
                      .slice(
                        (currentPage - 1) * Number(perPageValue),
                        currentPage * Number(perPageValue),
                      )
            }
          />

          {perPageValue !== 'All' && currentProducts.length > 0 && (
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
                isDisabled={
                  currentPage ===
                  Math.ceil(currentProducts.length / perPageValue)
                }
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </div>
          )}

          {currentProducts.length === 0 && (
            <div>
              <h3>
                {type === 'phones'
                  ? t.productsPage.noPhones
                  : type === 'tablets'
                    ? t.productsPage.noTablets
                    : t.productsPage.noAccessories}
              </h3>
            </div>
          )}
        </>
      )}
    </main>
  );
};
