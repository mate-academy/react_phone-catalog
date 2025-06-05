/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import accessoriesImg from '../../../../assets/img/ui/category-accessories.png';
import phonesImg from '../../../../assets/img/ui/category-phones.png';
import tabletsImg from '../../../../assets/img/ui/category-tablets.png';
import { useProductsContext } from '../../../../contexts/ProductsContext';
import { ProductCategory } from '../../../../modules/HomePage/components/ProductCategory';

import styles from './ProductsCategory.module.scss';

export const ProductsCategory: React.FC = () => {
  const { productsByCategory, loading } = useProductsContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.productsContainer}>
        <ProductCategory
          image={phonesImg}
          link="/phones"
          products={productsByCategory.phones || []}
          title="Mobile phones"
        />
        <ProductCategory
          image={tabletsImg}
          link="/tablets"
          products={productsByCategory.tablets || []}
          title="Tablets"
        />
        <ProductCategory
          image={accessoriesImg}
          link="/accessories"
          products={productsByCategory.accessories || []}
          title="Accessories"
        />
      </div>
    </div>
  );
};
