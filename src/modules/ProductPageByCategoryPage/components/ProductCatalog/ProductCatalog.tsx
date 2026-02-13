import styles from './ProductCatalog.module.scss';

import { useEffect, useState } from 'react';
import { AllProducts } from '../../../../shared/types/AllProduct/AllProduct';
import { useLocation, useSearchParams } from 'react-router-dom';

import { sortProducts } from '../../utils/sortProduct';
import { getPageNumber } from '../../utils/pageNumber';
import { getVisiblePages } from '../../utils/visiblePages';
import { handlePageChange } from '../../utils/pageChange';
import { getSearchWith } from '../../../../shared/utils/searchHelper';

import { ProductCard } from '../../../../shared/components/ProductCard/ProductCard';
import { getClassName } from '../../../../shared/utils/classNameActive';
import { ProductPagination } from '../Pagination/ProductPagination';
import { SkeletonProduct } from '../../../../shared/components/SceletonProduct/SceletonProduct';

type Props = {
  products: AllProducts[];
};

export const ProductCatalog: React.FC<Props> = ({ products }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortArray = [
    'Newest',
    'Alphabetically',
    'Price low to high',
    'Price high to low',
  ];
  const itemsArray = ['All', '4', '8', '16'];

  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || '1';

  const sortedProducts = sortProducts(products, sortBy);
  const normalizedItemsPerPage =
    itemsPerPage === 'All' ? sortedProducts.length : +itemsPerPage;

  const lastIndex = normalizedItemsPerPage * +currentPage;
  const firstIndex = lastIndex - normalizedItemsPerPage;
  const itemsPerPages = sortedProducts.slice(firstIndex, lastIndex);

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
            className={getClassName({
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
              onClick={() => setIsSortOpen(false)}
            >
              {sortArray.map(sort => (
                <div
                  className={styles.product__dropdownItem}
                  key={sort}
                  onMouseDown={() => handleSort(sort)}
                >
                  {sort}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.product__itemsPerPage}>
          <p className={styles.product__sortByTitle}>Items on page</p>
          <button
            aria-label="Кількість товару на сторінці"
            className={getClassName({
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
              onClick={() => setIsItemsOpen(false)}
            >
              {itemsArray.map(item => (
                <div
                  className={styles.product__dropdownItem}
                  key={item}
                  onMouseDown={() => handleItems(item)}
                >
                  {item}
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
        <ProductPagination
          currentPage={currentPage}
          visiblePages={visilbePages}
          searchParams={searchParams}
          handlePage={handlePage}
        />
      )}
    </section>
  );
};
