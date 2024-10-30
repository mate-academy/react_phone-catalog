import React, { useContext } from 'react';
import styles from './Price.module.scss';
import classNames from 'classnames';
import { ThemeContext } from '../../../store/ThemeProvider';

type Props = {
  price: number;
  fullPrice?: number;
  isBigTextSize?: boolean;
  otherClass?: string;
};

export const Price: React.FC<Props> = ({
  price,
  fullPrice,
  otherClass,
  isBigTextSize = false,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <p
      className={classNames(styles.Price, otherClass, {
        [styles.Price_big]: isBigTextSize,
      })}
    >
      {price}

      {fullPrice && (
        <span
          className={classNames(styles.Price__fullPrice, {
            [styles.Price__fullPrice_darkTheme]: isThemeDark,
          })}
        >
          {fullPrice}
        </span>
      )}
    </p>
  );
};
