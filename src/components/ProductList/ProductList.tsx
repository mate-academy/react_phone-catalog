import React, { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';
import { Product } from '../../types/Product';

type Props = {
  sortedProducts: Product[];
  productsPerPage: number;
};

const ProductList: React.FC<Props> = ({ sortedProducts, productsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {currentProducts.map(product => (
          <div key={product.id} className={styles.listItem}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(sortedProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={
                currentPage === i + 1
                  ? `${styles.buttonActive} ${styles.button}`
                  : styles.button
              }
            >
              {i + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default ProductList;
