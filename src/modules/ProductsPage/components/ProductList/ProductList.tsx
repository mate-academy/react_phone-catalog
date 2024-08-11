import React from 'react';
import cn from 'classnames';
import { arrangeItems, getNumbers } from '../../../../utils/paginationHelper';
import styles from './ProductList.module.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../components/ProductCard';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../utils/searchHelper';
import { Placeholder } from '../../../components/Placeholder';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  items: Product[];
};

export const ProductList: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  items,
}) => {
  const links = getNumbers(1, total);
  const [searchParams] = useSearchParams();
  const arrangedItems = arrangeItems(items, +perPage, currentPage);

  const handleOnClick = (position: number) => {
    onPageChange(position);
  };

  const handleNext = () => {
    if (currentPage < links[links.length - 1]) {
      handleOnClick(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handleOnClick(currentPage - 1);
    }
  };

  const renderPageLink = (page: number) => {
    return (
      <Link
        to={{
          search: getSearchWith(searchParams, { page: `${page}` }),
        }}
        onClick={() => handleOnClick(page)}
        key={page}
        className={cn(styles.productList__pageItem, {
          [styles['productList__pageItem-active']]: currentPage === page,
        })}
      >
        {page}
      </Link>
    );
  };

  const renderPagination = () => {
    const totalPages = links.length;
    const maxVisiblePages = 5; // Maximum number of visible pages
    const pageLinks = [];

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageLinks.push(renderPageLink(i));
      }
    } else {
      // Calculate range of pages to show
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      // Add the first page link
      if (startPage > 1) {
        pageLinks.push(renderPageLink(1));
        if (startPage > 2) {
          pageLinks.push(<span key="start-ellipsis">...</span>);
        }
      }

      // Add the range of pages
      for (let i = startPage; i <= endPage; i++) {
        pageLinks.push(renderPageLink(i));
      }

      // Add the last page link
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageLinks.push(<span key="end-ellipsis">...</span>);
        }

        pageLinks.push(renderPageLink(totalPages));
      }
    }

    return pageLinks;
  };

  if (!items.length) {
    return <Placeholder />;
  }

  return (
    <section className={styles.productList}>
      <div className={styles.productList__list}>
        {arrangedItems.map(product => (
          <article key={product.id} className={styles.productList__productCard}>
            <ProductCard product={product} discount />
          </article>
        ))}
      </div>

      {perPage !== 'all' && (
        <div className={styles.productList__block}>
          <Link
            to="/"
            className={cn(
              styles.productList__pageItem,
              styles.productList__button,
              styles['productList__button-arrowLeft'],
              {
                [styles['productList__button-disabled']]:
                  currentPage === links[0],
              },
            )}
            onClick={handlePrev}
          />

          <div className={styles.productList__pages}>{renderPagination()}</div>

          <Link
            to="/"
            className={cn(
              styles.productList__pageItem,
              styles.productList__button,
              styles['productList__button-arrowRight'],
              {
                [styles['productList__button-disabled']]:
                  currentPage === links[links.length - 1],
              },
            )}
            onClick={handleNext}
          />
        </div>
      )}
    </section>
  );
};
