import React from 'react';
import styles from './Category.module.scss';
import classNames from 'classnames';
import { CategoryData } from '../../types/CategoryData';
import { Link } from 'react-router-dom';

interface Props {
  data: CategoryData;
  className: string;
}

export const Category: React.FC<Props> = ({ data, className }) => {
  const { title, link, img, amountItems } = data;

  return (
    <div className={classNames(styles.category, className)}>
      <Link
        to={`/${link}`}
        className={classNames(
          styles.category__link,
          styles[`category__link--${link}`],
        )}
      >
        <img
          className={classNames(
            styles.category__img,
            styles[`category__img--${link}`],
          )}
          src={img}
          alt={title}
        />
      </Link>
      <h3 className={styles.category__title}>{title}</h3>
      <p className={styles.category__amount}>{amountItems} models</p>
    </div>
  );
};
