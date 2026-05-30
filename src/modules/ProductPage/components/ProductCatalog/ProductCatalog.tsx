import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import styles from './ProductCatalog.module.scss';

import { ProductCard } from '../../../../shared/components/ProductCard';
import { SkeletonProduct } from '../../../../shared/components/SkeletonProduct';
import { ProductPaginaton } from '../ProductPaginaton';

import { AllProducts } from '../../../../shared/types/AllProducts/AllProducts';
import { SortBy } from '../../../../shared/constants/sortBy';

import { getClassLink } from '../../../../shared/utils/activeClassName';
import { getSearchWith } from '../../../../shared/utils/searchHelper';
import { sortProducts } from '../../utils/sortProducts';
import { getPageNumber } from '../../utils/pageNumber';
import { getVisiblePages } from '../../utils/visiblePages';
import { handlePageChange } from '../../utils/pageChange';

import { ItemsOnPage } from '../../../../shared/constants/itemsOnPage';

type Props = {
  products: AllProducts[];
};

export const ProductCatalog: React.FC<Props> = ({ products }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

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

  const handleSort = (value: string) => {
    const newSearch = getSearchWith(searchParams, {
      perPage: itemsPerPage,
      sort: value,
      page: '1',
    });

    setSearchParams(newSearch);
  };

  const handleItems = (value: string) => {
    const newSearch = getSearchWith(searchParams, {
      perPage: value,
      sort: sortBy,
      page: '1',
    });

    setSearchParams(newSearch);
  };

  useEffect(() => {
    const timer = new Promise(resolve => setTimeout(resolve, 600));

    timer.then(() => {
      setIsLoading(false);
    });
  }, [pathname]);

  return (
    <section className={styles.product}>
      <div className={styles.product__sortSelectors}>
        <div className={styles.product__sortBy}>
          <p className={styles.product__sortByTitle}>Sort by</p>
          <button
            aria-label="Сортувати товар"
            className={getClassLink({
              isActive: isSortOpen,
              baseClass: styles.product__sortButton,
              activeClass: styles.product__sortButtonActive,
            })}
            onClick={() => setIsSortOpen(prev => !prev)}
            onBlur={() => setIsSortOpen(false)}
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
                <div
                  className={styles.product__dropdownItem}
                  key={sortDesc}
                  onMouseDown={() => handleSort(sortDesc)}
                >
                  {sortDesc}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.product__itemsPerPage}>
          <p className={styles.product__sortByTitle}>Items on page</p>
          <button
            aria-label="Кількість товару на сторінці"
            className={getClassLink({
              isActive: isItemsOpen,
              baseClass: styles.product__sortButton,
              activeClass: styles.product__itemsButtonActive,
            })}
            onClick={() => setIsItemsOpen(prev => !prev)}
            onBlur={() => setIsItemsOpen(false)}
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
                <div
                  className={styles.product__dropdownItem}
                  key={itemOnPage}
                  onMouseDown={() => handleItems(itemOnPage)}
                >
                  {itemOnPage}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.product__cards}>
        {itemsPerPages.map(product => (
          <div className={styles.product__card} key={product.id}>
            {isLoading ? (
              <SkeletonProduct />
            ) : (
              <ProductCard product={product} isHotPrice={true} />
            )}
          </div>
        ))}
      </div>

      {pagesPerPage.length > 1 && (
        <ProductPaginaton
          currentPage={currentPage}
          visilbePages={visilbePages}
          searchParams={searchParams}
          handlePage={handlePage}
        />
      )}
    </section>
  );
};
