import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { categories } from '../../data/categories';
import { useProducts } from '../../store/ProductsContext';
import styles from './Nav.module.scss';

interface Props {
  variant: string;
  onLinkClick?: () => void;
}

const formatCategoryName = (name: string) => {
  return name.length > 1
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : 'Home';
};

export const Nav: React.FC<Props> = ({ variant, onLinkClick }) => {
  const location = useLocation().pathname.split('/').pop();
  const { products } = useProducts();
  const activeCategory = products.find(
    product => product.itemId === location,
  )?.category;

  return (
    <div
      className={classNames(styles.nav, {
        [styles['nav--header']]: variant === 'header',
        [styles['nav--menu']]: variant === 'menu',
      })}
    >
      <ul className={styles.nav__list}>
        {categories.map((category, index) => (
          <li className={styles.nav__item} key={index}>
            <NavLink
              to={category.name}
              onClick={onLinkClick}
              className={({ isActive }) =>
                classNames(styles.nav__link, {
                  [styles[`nav__link--active`]]:
                    isActive || activeCategory === category.name,
                })
              }
            >
              {formatCategoryName(category.name)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
