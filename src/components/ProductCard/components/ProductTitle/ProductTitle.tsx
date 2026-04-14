import { Link } from 'react-router-dom';
import styles from './ProductTitle.module.scss';
import React from 'react';
import classNames from 'classnames';

interface Props {
  category?: string;
  itemId?: string;
  name: string;
}

export const ProductTitle: React.FC<Props> = ({ category, itemId, name }) => {
  return (
    <Link to={`/${category}/${itemId}`} className={styles.titleLink}>
      <div className={classNames(styles.title, 'body-text')}>{name}</div>
    </Link>
  );
};
