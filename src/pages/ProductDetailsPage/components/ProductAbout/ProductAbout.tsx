import React from 'react';
import styles from './ProductAbout.module.scss';
import { AnyDetailedProduct } from '../../../../types/DetailedProductTypes';

type Props = {
  product: AnyDetailedProduct;
  translatedDescription: { title: string; text: string[] }[];
};

export const ProductAbout: React.FC<Props> = ({
  product,
  translatedDescription,
}) => {
  return (
    <div className={styles['product-about']}>
      <h3 className={styles['product-about__title']}>Опис:</h3>
      <div className={styles['product-about__divider']}></div>
      {product.description &&
        translatedDescription.map(
          (block: { title: string; text: string[] }, index: number) => (
            <div className={styles['product-about__description']} key={index}>
              <h4 className={styles['product-about__description-block-title']}>
                {block.title}
              </h4>
              {block.text.map((paragraph, pIdx) => (
                <div key={pIdx}>
                  <p
                    className={
                      styles['product-about__description-block-paragraph']
                    }
                  >
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          ),
        )}
    </div>
  );
};
