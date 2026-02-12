import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import styles from './Pagination.module.scss';
import { AppContext } from '../../context/AppContext';
import { ItemsOnPageType } from '../../types/ItemsOnPageType';
import { ProductType } from '../../types/ProductType';
import { SortBy } from '../../types/SortBy';
import { PaginationNavigation } from '../PaginationNavigation';

const getVisibleProducts = (
  products: ProductType[],
  perPage: ItemsOnPageType,
  page: number,
  sortBy: SortBy,
) => {
  const sortedProducts = [...products];

  if (sortBy === SortBy.ALPHABETICALLY) {
    sortedProducts.sort((a, b) => a.itemId.localeCompare(b.itemId));
  } else if (sortBy === SortBy.CHEAPEST) {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else {
    sortedProducts.sort((a, b) => b.year - a.year);
  }

  if (perPage === 'all') {
    return sortedProducts;
  }

  const start = (page - 1) * +perPage;
  const end = start + +perPage;

  return sortedProducts.slice(start, end);
};

export const Pagination = () => {
  const { products, perPage, currentPage, sortBy, isLoading } =
    useContext(AppContext)!;
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  const [showNoProducts, setShowNoProducts] = useState(false);

  useEffect(() => {
    setVisibleProducts(
      getVisibleProducts(products, perPage, currentPage, sortBy),
    );
  }, [products, perPage, currentPage, sortBy]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (visibleProducts.length === 0 && !isLoading) {
      timeoutId = setTimeout(() => {
        setShowNoProducts(true);
      }, 500);
    } else {
      setShowNoProducts(false);
    }

    return () => clearTimeout(timeoutId);
  }, [visibleProducts, isLoading]);

  return (
    <>
      {!showNoProducts ? (
        <div className={styles.pagination}>
          <div className={styles.pagination__list}>
            {visibleProducts.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          {perPage !== 'all' && <PaginationNavigation />}
        </div>
      ) : (
        <h1>There are no products yet...</h1>
      )}
    </>
  );
};
