import React, { useEffect, useState } from 'react';
import { ProductSliderButtons } from '../../../HomePage/components/ProductSliderButtons';
import styles from './AlsoLike.module.scss';
import { ProductsSlider } from '../../../HomePage/components/ProductSlider';
import { Phone } from '../../../../types/Phone';
import allProducts from '../../../../../public/api/products.json';
import { Product } from '../../../../types/Product';

type Props = {
  currentProduct: Phone;
};

export const AlsoLike: React.FC<Props> = ({ currentProduct }) => {
  const [index, setIndex] = useState(0);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);

  useEffect(() => {
    const otherProd = [...allProducts].filter(
      p => p.itemId !== currentProduct.id,
    );

    otherProd.sort(() => Math.random() - 0.5);

    setOtherProducts(otherProd);
  }, [currentProduct]);

  return (
    <section className={styles.alsolike}>
      <div className={styles.alsolike__top}>
        <h2>You may also like</h2>
        <ProductSliderButtons
          length={otherProducts.length}
          index={index}
          setIndex={setIndex}
        />
      </div>
      <ProductsSlider
        uniqueProducts={otherProducts}
        index={index}
        fullPrice={true}
      />
    </section>
  );
};
