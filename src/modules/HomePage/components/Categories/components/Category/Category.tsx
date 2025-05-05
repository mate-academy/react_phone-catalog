import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Category.module.scss';

interface Props {
  value: string;
  index: number;
  imgs: string[];
  bcColors: string[];
  categoriesLhs: number[];
  link: string;
}

export const Category: React.FC<Props> = React.memo(
  ({ value, index, imgs, bcColors, categoriesLhs, link }) => {
    return (
      <div className={styles.category} key={imgs[index]}>
        <div
          className={styles['img-wrapper']}
          style={{ backgroundColor: bcColors[index] }}
        >
          <Link to={`/${link}`}>
            <img
              src={imgs[index]}
              alt={value}
              className={classNames(styles.img, styles[`img-${index}`])}
            />
          </Link>
        </div>

        <Link to={`/${link}`} className={styles['category-title']}>
          {value}
        </Link>

        <h4 className={styles['category-subtitle']}>
          {categoriesLhs[index]} models
        </h4>
      </div>
    );
  },
);

Category.displayName = 'Category';
