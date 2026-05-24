import React from 'react';
import styles from './About.module.scss';
import { ProductFullInfo } from '../../../shared/Utills/types';

type Props = {
  selectedProduct: ProductFullInfo | null;
};

export const About: React.FC<Props> = ({ selectedProduct }) => {
  return (
    <section className={styles.about}>
      <h3>About</h3>

      <div className={styles.polosa}></div>

      {selectedProduct?.description.map((desc, index) => (
        <div className={styles.description__container} key={index}>
          <h4>{desc.title}</h4>
          <p>{desc.text}</p>
        </div>
      ))}
    </section>
  );
};
