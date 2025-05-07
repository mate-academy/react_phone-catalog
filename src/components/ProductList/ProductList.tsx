import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';
import { Product } from '../../types/Product';

type Props = {
  sortedProducts: Product[];
  productsPerPage?: number;
};

const ProductList: React.FC<Props> = ({
  sortedProducts,
  productsPerPage = 8,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const getCurrentProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const currentProducts = getCurrentProducts();

  useEffect(() => {
    setCurrentPage(1);
  }, [sortedProducts]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getPaginationRange = () => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {currentProducts.map(product => (
          <div key={product.id} className={styles.listItem}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.button}
            onClick={() => {
              setCurrentPage(prev => Math.max(1, prev - 1));
              scrollToTop();
            }}
            disabled={currentPage === 1}
          >
            <img src="img/servic/arrow-left.svg" alt="" />
          </button>

          {getPaginationRange().map(page => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                scrollToTop();
              }}
              className={
                currentPage === page
                  ? `${styles.buttonActive} ${styles.button}`
                  : styles.button
              }
            >
              {page}
            </button>
          ))}

          <button
            className={styles.button}
            onClick={() => {
              setCurrentPage(prev => Math.min(totalPages, prev + 1));
              scrollToTop();
            }}
            disabled={currentPage === totalPages}
          >
            <img src="img/servic/arrow-right.svg" alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
