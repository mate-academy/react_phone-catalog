import React from 'react';
import styles from './ProductDescription.module.scss';
import { Description } from './components/Description';
import { DescriptionItem } from '../../../../types/DescriptionItem';
import { Goods } from '../../../../types/Goods';
import { TechSpecs } from './components/TechSpecs';

type Props = {
  product: Goods;
  description: DescriptionItem[];
};

export const ProductDescription: React.FC<Props> = ({
  product,
  description,
}) => {
  return (
    <div className={styles['product-description']}>
      <div className={styles['product-description__container']}>
        <div className={styles['product-description__about']}>
          <div className={styles['product-description__title']}>About</div>
          <div className={styles['product-description__items']}>
            {description &&
              description.length > 0 &&
              description.map((item, index) => (
                <Description key={index} title={item.title} text={item.text} />
              ))}
          </div>
        </div>

        <TechSpecs product={product} />
      </div>
    </div>
  );
};
