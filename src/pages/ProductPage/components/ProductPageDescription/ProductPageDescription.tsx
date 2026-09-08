import React from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';

import { ProductTechSpec } from '../ProductTechSpec';
import { ProductDescriptionTopic } from '../ProductDescriptionTopic';

import styles from './ProductPageDescription.module.scss';

type Props = {
  product: ProductDetails;
};

export const ProductPageDescription: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles['product-page__description-wrapper']}>
      <div className={styles['product-page__description-topic-wrapper']}>
        <div
          className={styles['product-page__description-topic-title-wrapper']}
        >
          <h3>About</h3>
          <div
            className={`divider ${styles['product-page__description-divider']}`}
          ></div>
        </div>
        {product?.description.map(info => (
          <ProductDescriptionTopic key={info.title} description={info} />
        ))}
      </div>
      <div className={styles['product-page__description-topic-wrapper']}>
        <div
          className={styles['product-page__description-topic-title-wrapper']}
        >
          <h3>Tech specs</h3>
          <div
            className={`divider ${styles['product-page__description-divider']}`}
          ></div>
        </div>
        {product.screen && (
          <ProductTechSpec title={'Screen'} value={product.screen} />
        )}
        {product.screen && (
          <ProductTechSpec title={'Resolution'} value={product.resolution} />
        )}
        {product.screen && (
          <ProductTechSpec title={'Processor'} value={product.processor} />
        )}
        {product.screen && (
          <ProductTechSpec title={'RAM'} value={product.ram} />
        )}
        {product.screen && (
          <ProductTechSpec title={'Built in memory'} value={product.capacity} />
        )}
        {product.screen && (
          <ProductTechSpec title={'Camera'} value={product.camera} />
        )}
        {product.screen && (
          <ProductTechSpec title={'Zoom'} value={product.zoom} />
        )}
        {product.screen && (
          <ProductTechSpec title={'Cell'} value={product.cell} />
        )}
      </div>
    </div>
  );
};
