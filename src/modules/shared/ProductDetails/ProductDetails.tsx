import React, { useContext } from 'react';
import styles from './ProductDetails.module.scss';
import classNames from 'classnames';
import { ThemeContext } from '../../../store/ThemeProvider';

type Props = {
  values: { [key: string]: string | string[] };
  otherClass?: string;
};

export const ProductDetails: React.FC<Props> = ({ values, otherClass }) => {
  const { isThemeDark } = useContext(ThemeContext);

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
          <p
            className={classNames(styles.ProductDetails__item, {
              [styles.ProductDetails__item_darkTheme]: isThemeDark,
            })}
            key={key}
          >
            {key} <span>{value}</span>
          </p>
        );
      })}
    </div>
  );
};
