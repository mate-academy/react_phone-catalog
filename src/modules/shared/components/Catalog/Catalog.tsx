import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import styles from './Catalog.module.scss';
import cn from 'classnames';
import { SortSelectData } from '../../../../types/SortSelectData';
import React, { useEffect, useState } from 'react';
import { ItemsPerPageData } from '../../../../types/ItemPerPageData';
import { NUMBER_OF_VISIBLE_BTNS } from '../../../../types/Constants';

type Props = {
  title: string;
  products: Product[];
  renderItem: (item: Product) => React.ReactNode;
  sortByValue?: string;
  setSortByValue?: (value: string) => void;
  itemsOnPageValue?: string;
  setItemsOnPageValue?: (value: string) => void;
  currentPage?: number;
  totalPages?: number;
  visibleItems?: Product[];
  setCurrentPage?: (value: number) => void;
};

export const Catalog = ({
  title,
  products,
  renderItem,
  sortByValue,
  setSortByValue,
  itemsOnPageValue,
  setItemsOnPageValue,
  setCurrentPage,
  currentPage = 1,
  totalPages = 1,
  visibleItems = products,
}: Props) => {
  const location = useLocation();

  const [isSortSelectOpen, setIsSortSelectOpen] = useState(false);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  const startPage =
    currentPage <= NUMBER_OF_VISIBLE_BTNS
      ? 1
      : currentPage - (NUMBER_OF_VISIBLE_BTNS - 1);
  const pages = Array.from(
    {
      length: Math.min(NUMBER_OF_VISIBLE_BTNS, totalPages - startPage + 1),
    },
    (_, index) => startPage + index,
  );

  useEffect(() => {
    const handleCloseMenu = () => {
      setIsSortSelectOpen(false);
      setIsItemsPerPageOpen(false);
    };

    document.addEventListener('click', handleCloseMenu);

    return () => document.removeEventListener('click', handleCloseMenu);
  }, []);

  return (
    <section className={styles.catalogSection}>
      <div className={styles.historyNav}>
        <Link className={styles.historyLink} to={'/'}>
          <img src="icons/home.svg" alt="home" />
        </Link>
        <img src="icons/chevron-arrow-right.svg" alt="arrow-right" />
        <Link
          className={`${styles.historyLink} ${styles.pathname}`}
          to={location.pathname}
        >
          {title}
        </Link>
      </div>
      <div className={styles.info}>
        <h1 className={styles.catalogTitle}>{title}</h1>
        <span className={styles.productCounter}>{products.length} models</span>
      </div>
      {sortByValue && itemsOnPageValue && (
        <div className={styles.filters}>
          <div className={styles.sortSelect}>
            <label className={styles.label} htmlFor="sortBy">
              Sort by
            </label>
            <div
              className={styles.select}
              onClick={e => {
                e.stopPropagation();
                setIsSortSelectOpen(prev => !prev);
              }}
            >
              <span className={styles.placeholder}>{sortByValue}</span>

              <ul
                className={cn(styles.dropdown, {
                  [styles.isOpen]: isSortSelectOpen,
                })}
              >
                {SortSelectData.map(option => (
                  <li
                    onClick={() => setSortByValue?.(option.value)}
                    className={cn(styles.option)}
                    key={option.value}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.itemsOnPage}>
            <label className={styles.label} htmlFor="itemsOnPage">
              Items on page
            </label>
            <div
              className={styles.select}
              onClick={e => {
                e.stopPropagation();
                setIsItemsPerPageOpen(prev => !prev);
              }}
            >
              <span className={styles.placeholder}>{itemsOnPageValue}</span>

              <ul
                className={cn(styles.dropdown, {
                  [styles.isOpen]: isItemsPerPageOpen,
                })}
              >
                {ItemsPerPageData.map(option => (
                  <li
                    onClick={() => setItemsOnPageValue?.(option.value)}
                    className={cn(styles.option)}
                    key={option.value}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className={styles.productsList}>
        {visibleItems?.map(item => (
          <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pageBtns}>
          <button
            onClick={() => {
              setCurrentPage?.(currentPage !== 1 ? currentPage - 1 : 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={styles.controlBtn}
          >
            <img src="icons/chevron-arrow-left.svg" alt="left" />
          </button>
          {pages.map(page => {
            return (
              <button
                className={cn(`${styles.btn}`, {
                  [styles.isActive]: currentPage === page,
                })}
                onClick={() => {
                  setCurrentPage?.(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                key={page}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => {
              setCurrentPage?.(
                currentPage !== totalPages ? currentPage + 1 : totalPages,
              );
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={styles.controlBtn}
          >
            <img src="icons/chevron-arrow-right.svg" alt="right" />
          </button>
        </div>
      )}
    </section>
  );
};
