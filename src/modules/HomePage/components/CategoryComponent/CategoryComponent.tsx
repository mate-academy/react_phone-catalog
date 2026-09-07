import React from 'react';
import classNames from 'classnames';

import styles from './CategoryComponent.module.scss';

import { Category } from '@HomePage/types/Category';

import { Image } from '@components/Image';
import { Link } from 'react-router-dom';

type Props = {
  className: string;
  category: Category;
};

export const CategoryComponent: React.FC<Props> = ({ className, category }) => {
  return (
    <Link
      to={category.url}
      aria-label={category.title}
      className={classNames(className, styles['category-component'])}
    >
      <div
        className={styles['category-component__image-wrapper']}
        style={{ backgroundColor: category.bgColor }}
      >
        <Image
          src={category.img}
          alt={`${category.title} image`}
          className={styles['category-component__image']}
        />
      </div>

      <div className={styles['category-component__content']}>
        <h4>{category.title}</h4>

        <div className={styles['category-component__amount']}>
          {`${category.amount} model${category.amount === 1 ? '' : 's'}`}
        </div>
      </div>
    </Link>
  );
};
