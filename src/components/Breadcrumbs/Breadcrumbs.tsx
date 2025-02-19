import classNames from 'classnames';
import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
  category?: string;
}

const formatCategoryName = (name: string) => {
  return name === 'home' ? '' : name.charAt(0).toUpperCase() + name.slice(1);
};

export const Breadcrumbs: React.FC<Props> = ({ category }) => {
  const location = useLocation().pathname;
  const path = useMemo(() => {
    return ['home', ...location.split('/').filter(point => point !== '')];
  }, [location]);

  const visiblePath = useMemo(() => {
    return path.map(point =>
      point === 'product' && category ? category : point,
    );
  }, [category, path]);

  return (
    <ul className={styles.breadcrumbs}>
      {visiblePath.map((point, index) => {
        const isLast = index === path.length - 1;
        const to = !isLast
          ? '/' + visiblePath.slice(1, index + 1).join('/')
          : '';

        const className = classNames({
          [styles.breadcrumbs__icon]: point === 'home',
          [styles['breadcrumbs__icon--home']]: point === 'home',
          [styles.breadcrumbs__text]: point !== 'home',
          [styles['breadcrumbs__text--current']]: isLast,
        });

        return (
          <li className={styles.breadcrumbs__crumb} key={point}>
            <NavLink to={to} className={className}>
              {formatCategoryName(point)}
            </NavLink>
            {!isLast && (
              <span
                className={classNames(
                  styles.breadcrumbs__icon,
                  styles['breadcrumbs__icon--separator'],
                )}
              ></span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
