import React from 'react';
import stylesCard from '@shared/ui/ProductCard/ProductCard.module.scss';
import styles from './ProductSpecs.module.scss';
import { getKeySpecs } from '@shared/utils/getKeySpecs';

type Props = {
  keySpecs: ReturnType<typeof getKeySpecs>;
};

export const ProductSpecs: React.FC<Props> = ({ keySpecs }) => (
  <div className={styles.productSpecs}>
    {keySpecs.map(spec => (
      <div key={spec.translationKey} className={stylesCard.cardSpec}>
        <span className={stylesCard.cardSpecTitle}>{spec.translationKey}</span>
        <span className={stylesCard.cardSpecValue}>{spec.value}</span>
      </div>
    ))}
  </div>
);
