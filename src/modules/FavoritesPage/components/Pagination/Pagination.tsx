import React from 'react';
import styles from './Pagination.module.scss';
import { Button } from '../../../../components/Button';

const imgSrcArrow = {
  default: '/icons/arrow_circle_default.svg',
  hover: '/icons/arrow_circle_hover.svg',
  disabled: '/icons/arrow_circle_disabled.svg',
};

export const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <Button rotation={180} disabled={true} iconsSrc={imgSrcArrow} />

      <div className={styles.pagination__pages}>
        <button className={styles.pagination__page}>1</button>
        <button className={styles.pagination__page}>2</button>
        <button className={styles.pagination__page}>3</button>
        <button className={styles.pagination__page}>4</button>
      </div>

      <Button iconsSrc={imgSrcArrow} />
    </div>
  );
};
