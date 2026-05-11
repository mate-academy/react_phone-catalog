import React from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Icon } from '../../components/Icon';
import { PathLine } from '../../components/PathLine/indes';

export const ProductDetailsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <PathLine />
        <div className={styles.top}></div>
        <button className={styles.page__backbutton}>
          <Icon name="arrowleft" />
          <div className={styles.text}>Back</div>
        </button>
      </div>
    </div>
  );
};
