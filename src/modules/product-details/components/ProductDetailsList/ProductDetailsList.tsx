import React from 'react';
import { ProductDetails } from '../ProductDetails/ProductDetails';
import { Tablet } from '../../../../types/tablet';
import { Phone } from '../../../../types/phone';
import { Accessorie } from '../../../../types/accessorie';
import styles from './ProductDetailsList.module.scss';

type AnyProduct = Phone | Tablet | Accessorie;

type Props = {
  products: AnyProduct[];
  title: string;
};

export const ProductDetailsList: React.FC<Props> = ({ products }) => {
  return (
    <div>
      <section className={styles.aaaaaaaaaaaa}>
        {products.map(product => (
          <div key={product.id} data-card>
            <ProductDetails product={product} />
          </div>
        ))}
      </section>
    </div>
  );
};
