import React from 'react';
import styles from '../ProductPage.module.scss';

type Props = { description: { title: string; text: string[] }[] };

export const ProductDetailsSection: React.FC<Props> = ({ description }) => (
  <div className={styles['product-page__description']}>
    <h3 className={styles['product-page__description-title']}>About</h3>
    <div className={styles['product-page__description-text']}>
      {description.map((block, index) => (
        <div key={index} className={styles['product-page__description-block']}>
          <h4 className={styles['product-page__description-block-title']}>
            {block.title}
          </h4>
          {block.text.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className={styles['product-page__description-block-paragraph']}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  </div>
);
