import React from 'react';
import styles from './ProductDetails.module.scss';
import classNames from 'classnames';

type Props = {
  values: { [key: string]: string | string[] };
  otherClass?: string;
};

export const ProductDetails: React.FC<Props> = ({ values, otherClass }) => {
  return (
    <div className={classNames(styles.ProductDetails, otherClass)}>
      {Object.keys(values).map(key => {
        const currValue = values[key];

        const value = Array.isArray(currValue)
          ? currValue.join(', ')
          : currValue;

        if (!value) {
          return '';
        }

        return (
          <p className={styles.ProductDetails__item} key={key}>
            {key} <span>{value}</span>
          </p>
        );
      })}
    </div>
  );
};
