import React, { useContext } from 'react';

import { ProductsContext } from '../../../../../../context/ProductsContext';
// eslint-disable-next-line max-len
import { CurrentProduct } from '../../../../../../context/ProductsContext/types/CurrentProduct';
import { DividerMT16 } from '../DividerMT16';
import styles from './About.module.scss';

export const About: React.FC = () => {
  const { currentProduct } = useContext(ProductsContext);
  const { description } = currentProduct as CurrentProduct;

  return (
    <section className={styles.about}>
      <div className={styles['title-wrapper']}>
        <h2 className={styles.title}>About</h2>
        <DividerMT16 />
      </div>
      {description.map((block, index) => {
        const { title, text } = block;

        return (
          <div className={styles.block} key={`descr-${index}`}>
            <h3 className={styles['block-title']}>{title}</h3>
            <div className={styles['block-text']}>{text}</div>
          </div>
        );
      })}
    </section>
  );
};
