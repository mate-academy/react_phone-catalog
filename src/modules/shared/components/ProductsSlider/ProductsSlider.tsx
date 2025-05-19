import React, { useState } from 'react';

import styles from './ProductsSlider.module.scss';
import { Products } from '../../../../types/Products';
import { ProductCard } from '../productCard';
import { AppButton } from '../appButton';

type Props = {
  products: Products[];
  title?: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title = '' }) => {
  const [startProduct, setStartProduct] = useState(0);
  const countProduct = 4;
  const visibleProducts = products.slice(startProduct, startProduct + 4);

  function showNextProduct() {
    const newStartProduct = Math.min(
      startProduct + 1,
      products.length - 1 - countProduct,
    );

    setStartProduct(newStartProduct);
  }

  function showPrevProduct() {
    const newStartProduct = Math.max(startProduct - 1, 0);

    setStartProduct(newStartProduct);
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.topElements}>
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.buttons}>
          <AppButton
            size={'s'}
            src={'img/icons/arrow-left.svg'}
            buttonName={'prev product'}
            onClick={showPrevProduct}
          />
          <AppButton
            size={'s'}
            src={'img/icons/arrow-right.svg'}
            buttonName={'next product'}
            onClick={showNextProduct}
          />
        </div>
      </div>

      <div className={styles.slider}>
        {visibleProducts.map(product => (
          <div key={product.id} className={styles.sliderElement}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
