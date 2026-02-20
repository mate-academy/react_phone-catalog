import styles from './ProductTechInfo.module.scss';

import React from 'react';

import { Spec, TechSpecs } from '../TechSpecs/TechSpecs';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: Product | ProductDetails;
  variant: 'short' | 'mid' | 'full';
};

export const ProductTechInfo: React.FC<Props> = ({ product, variant }) => {
  let specs: Spec[] = [];

  if (variant === 'short') {
    specs = [
      { label: 'Screen', value: product.screen },
      { label: 'Capacity', value: product.capacity },
      { label: 'RAM', value: product.ram },
    ];
  } else if (variant === 'mid' && 'resolution' in product) {
    specs = [
      { label: 'Screen', value: product.screen ?? '' },
      { label: 'Resolution', value: product.resolution ?? '' },
      { label: 'Processor', value: product.processor ?? '' },
      { label: 'RAM', value: product.ram ?? '' },
    ];
  } else if (variant === 'full' && 'resolution' in product) {
    specs = [
      { label: 'Screen', value: product.screen ?? '' },
      { label: 'Resolution', value: product.resolution ?? '' },
      { label: 'Processor', value: product.processor ?? '' },
      { label: 'RAM', value: product.ram ?? '' },
      { label: 'Built in memory', value: product.capacity ?? '' },
      { label: 'Camera', value: product.camera ?? '' },
      { label: 'Zoom', value: product.zoom ?? '' },
      { label: 'Cell', value: product.cell?.join(', ') ?? '' },
    ];
  }

  if (variant === 'full') {
    return (
      <div className={styles.ProductTechInfo__container}>
        <h3 className={styles.ProductTechInfo__title}>Tech specs</h3>
        <TechSpecs specs={specs} />
      </div>
    );
  }

  return <TechSpecs specs={specs} />;
};
