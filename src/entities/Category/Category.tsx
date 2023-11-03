import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ICategory } from './category.interface';
import styles from './Category.module.scss';

type Props = {
  category: ICategory,
};

export const Category: React.FC<Props> = ({
  category: {
    name,
    title,
    image,
    total,
  },
}) => {
  return (
    <Link to={`/${name}`} className={styles.link}>
      <div className={classNames(styles.img, styles[name])}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.total}>{`${total} models`}</span>
      </div>
    </Link>
  );
};
