import React from 'react';
import styles from './TechSpecs.module.scss';
import { Goods } from '../../../../../../types/Goods';
import { Details } from '../../../../../../shared/layout/Details/Details';

type Props = {
  product: Goods;
};

const details = [
  'Screen',
  'Resolution',
  'Processor',
  'RAM',
  'Capacity',
  'Camera',
  'Zoom',
  'Cell',
];

export const TechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.tech}>
      <div className={styles.tech__container}>
        <div className={styles.tech__title}>Tech Specs</div>

        <Details
          product={product}
          details={details}
          customStyles={'small-font'}
        />
      </div>
    </div>
  );
};
