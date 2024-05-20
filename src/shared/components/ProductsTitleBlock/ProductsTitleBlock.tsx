import React, { useContext } from 'react';
import styles from './ProductsTitleBlock.module.scss';
import classNames from 'classnames';
import { PathBar } from '../PathBar/PathBar';
import { AppContext } from '../../../utils/AppContext';

type Props = {
  category: string;
  title: string;
  quantity: number;
};

export const ProductsTitleBlock: React.FC<Props> = ({
  category,
  title,
  quantity,
}) => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <div className={classNames(styles.titleBlock)}>
      <PathBar category={category} />

      <h1
        className={classNames(
          styles.title,
          isDarkTheme ? styles.titleDark : '',
        )}
      >
        {title}
      </h1>

      <span
        className={classNames(
          styles.quantityInfo,
          isDarkTheme ? styles.quantityInfoDark : '',
        )}
      >
        {quantity} models
      </span>
    </div>
  );
};
