import React from 'react';
import styles from './Breadcrumbs.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { HomeIcon } from '../../../../shared/UI/Icon/HomeIcon';

interface Props {
  items: { label: string; to?: string }[];
  classNames?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ items, classNames }) => {
  return (
    <ol className={`${styles.breadcrumbs} ${classNames}`}>
      <li className={styles.item}>
        <Link className={styles.home} to={'/'}>
          <HomeIcon />
        </Link>
      </li>

      {items.map((item, i) => (
        <li key={item.label} className={styles.item}>
          <span className={styles.separator}></span>

          {item.to ? (
            <Link
              className={cn(styles.text, {
                [styles.last]: items.length - 1 === i,
              })}
              to={`/${item.to}`}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(styles.text, {
                [styles.last]: items.length - 1 === i,
              })}
            >
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};
