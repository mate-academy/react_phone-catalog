import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ThemeContext } from '../../store/ThemeContex';
import { ProductsContext } from '../../store/ProductsContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { handleClickToTop } from '../../helpers/scrollToTop';
import { Theme } from '../../types/Theme';
import styles from './ShopByCategory.module.scss';
import phones from '../../images/category/phones.png';
import tablets from '../../images/category/tablets.png';
import accessories from '../../images/category/accessories.png';

export const ShopByCategory = () => {
  const { products } = useContext(ProductsContext);
  const { theme } = useContext(ThemeContext);

  const phonesAmount = getProductsByCategory(products, 'phones').length;
  const tabletsAmount = getProductsByCategory(products, 'tablets').length;
  const accesAmount = getProductsByCategory(products, 'accessories').length;

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  const links = [
    {
      navlink: '/phones',
      name: 'Mobile phones',
      amount: phonesAmount,
      src: phones,
      alt: 'Phones',
    },

    {
      navlink: '/tablets',
      name: 'Tablets',
      amount: tabletsAmount,
      src: tablets,
      alt: 'Tablets',
    },
    {
      navlink: '/accessories',
      name: 'Accessories',
      amount: accesAmount,
      src: accessories,
      alt: 'Accessories',
    },
  ];

  useEffect(() => {
    if (nameOfPath) {
      handleClickToTop();
    }
  }, [nameOfPath]);

  return (
    <React.Fragment>
      <h2
        className={cn({
          [styles.category__title]: theme === Theme.Light,
          [styles['category__title-dark']]: theme === Theme.Dark,
        })}
      >
        Shop by category
      </h2>
      <div className={styles.category__container}>
        {links.map(link => (
          <Link
            key={link.navlink}
            to={link.navlink}
            className={styles.category__link}
          >
            <div>
              <img
                src={link.src}
                alt={link.alt}
                className={styles.category__image}
              />
              <h4
                className={cn({
                  [styles.category__name]: theme === Theme.Light,
                  [styles['category__name-dark']]: theme === Theme.Dark,
                })}
              >
                {link.name}
              </h4>
              <p
                className={cn({
                  [styles.category__amount]: theme === Theme.Light,
                  [styles['category__amount-dark']]: theme === Theme.Dark,
                })}
              >
                {`${link.amount} models`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};
