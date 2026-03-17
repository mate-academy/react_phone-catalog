import React from 'react';
import styles from './RecommendedProducts.module.scss';
import { RecomendedSlider } from '../RecommendedSlider';
import { Product } from '../../types/Product';

type Props = {
  recommendedProducts: Product[];
};

export const RecommendedProducts: React.FC<Props> = ({
  recommendedProducts,
}) => {
  return (
    <section className={styles.recommendedSection}>
      <div className={styles.recommendedContent}>
        <div className={styles.wrapper}>
          <h2 className={styles.sectionTitle}>You may also like</h2>
        </div>
        <RecomendedSlider recommendedProducts={recommendedProducts} />
      </div>
    </section>
  );
};
