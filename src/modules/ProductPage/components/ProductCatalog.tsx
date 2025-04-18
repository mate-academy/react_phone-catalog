import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './ProductCatalog.module.scss';

import { ProductCard } from '../../../shared/components/ProductCard';
import { AllProducts } from '../../../shared/types/AllProducts/AllProducts';

import { getClassLink } from '../../../shared/utils/activeClassName';
import { getSearchWith } from '../../../shared/utils/searchHelper';
import { sortProducts } from '../utils/sortProducts';
import { getPageNumber } from '../utils/pageNumber';
import { getVisiblePages } from '../utils/visiblePages';
import { handlePageChange } from '../utils/pageChange';
import { SortBy } from '../../../shared/constants/sortBy';
import { ItemsOnPage } from '../../../shared/constants/itemsOnPage';

type Props = {
  products: AllProducts[];
};

export const ProductCatalog: React.FC<Props> = ({ products }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || '1';

  const sortedProducts = sortProducts(products, sortBy);
  const normalizedItemsPerPage =
    itemsPerPage === 'All' ? sortedProducts.length : +itemsPerPage;

  const lastOfindex = normalizedItemsPerPage * +currentPage;
  const firstOfindex = lastOfindex - normalizedItemsPerPage;
  const itemsPerPages = sortedProducts.slice(firstOfindex, lastOfindex);

  const pageItem = Math.ceil(sortedProducts.length / normalizedItemsPerPage);

  const pagesPerPage = getPageNumber(pageItem);
  const visilbePages = getVisiblePages(currentPage, pagesPerPage);

  const handlePage = (direction: string) => {
    handlePageChange(
      direction,
      searchParams,
      setSearchParams,
      currentPage,
      pagesPerPage,
    );
  };

  return (
    <section className={styles.product}>
      <div className={styles.product__sortSelectors}>
        <div className={styles.product__sortBy}>
          <p className={styles.product__sortByTitle}>Sort by</p>
          <button
            className={getClassLink({
              isActive: isSortOpen,
              baseClass: styles.product__sortButton,
              activeClass: styles.product__sortButtonActive,
            })}
            onClick={() => setIsSortOpen(prev => !prev)}
            // onBlur={() => setIsSortOpen(false)}
          >
            {sortBy}
            <span className={styles.product__arrowSort}></span>
          </button>
          {isSortOpen && (
            <div
              className={styles.product__dropdownMenu}
              aria-labelledby="dropdownMenuButton"
              onClick={() => setIsSortOpen(false)}
            >
              {Object.values(SortBy).map(sortDesc => (
                <Link
                  to={{
                    search: getSearchWith(searchParams, {
                      sort: sortDesc,
                      perPage: itemsPerPage,
                      page: '1',
                    }),
                  }}
                  className={styles.product__dropdownItem}
                  key={sortDesc}
                >
                  {sortDesc}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className={styles.product__itemsPerPage}>
          <p className={styles.product__sortByTitle}>Items on page</p>
          <button
            className={getClassLink({
              isActive: isItemsOpen,
              baseClass: styles.product__sortButton,
              activeClass: styles.product__itemsButtonActive,
            })}
            onClick={() => setIsItemsOpen(prev => !prev)}
            // onBlur={() => setIsOpen(false)}
          >
            {itemsPerPage}
            <span className={styles.product__arrowItems}></span>
          </button>

          {isItemsOpen && (
            <div
              className={styles.product__dropdownMenu}
              aria-labelledby="dropdownMenuButton"
              onClick={() => setIsItemsOpen(false)}
            >
              {Object.values(ItemsOnPage).map(itemOnPage => (
                <Link
                  to={{
                    search: getSearchWith(searchParams, {
                      perPage: itemOnPage,
                      sort: sortBy,
                      page: '1',
                    }),
                  }}
                  className={styles.product__dropdownItem}
                  key={itemOnPage}
                >
                  {itemOnPage}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.product__cards}>
        {itemsPerPages.map(product => (
          <div className={styles.product__card} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {pagesPerPage.length > 1 && (
        <div className={styles.product__pagination}>
          <button
            className={styles.product__LeftBtn}
            onClick={() => handlePage('prev')}
          >
            <img
              src="src/assets/images/productPage/left-arrow.svg"
              alt=""
              className={styles.product__BtnImg}
            />
          </button>
          {visilbePages.map(page => (
            <Link
              to={{
                search: getSearchWith(searchParams, { page: page.toString() }),
              }}
              className={getClassLink({
                isActive: page === +currentPage,
                baseClass: styles.product__paginationNums,
                activeClass: styles.product__paginationNumsActive,
              })}
              onClick={() => scrollTo(0, 0)}
              key={page}
            >
              {page}
            </Link>
          ))}
          <button
            className={styles.product__rightBtn}
            onClick={() => handlePage('next')}
          >
            <img
              src="src/assets/images/productPage/right-arrow.svg"
              alt=""
              className={styles.product__BtnImg}
            />
          </button>
        </div>
      )}
    </section>
  );
};
