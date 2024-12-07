import { useEffect, useMemo, useState } from 'react';

import cn from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';

import CartIcon from '@assets/images/icons/cart-icon.svg?react';
import HeartIcon from '@assets/images/icons/heart-icon.svg?react';

import { Box } from '@shared/base/Box';
import { List } from '@shared/base/List';
import { useStoredProducts } from '@shared/contexts/StoredProducts';

import styles from './MobileNavigation.module.scss';
import { NAVIGATION_CONFIG } from '../../utils/navigation.config';
import { BurgerButton } from '../BurgerButton';
import { NavigationItem } from '../NavigationItem';
import { NavigationLink } from '../NavigationLink';
import { ThemeButton } from '../ThemeButton';

export const MobileNavigation = () => {
  const { pathname, search } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { storedQuantity } = useStoredProducts();
  const [searchParams] = useSearchParams();

  const getSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    return params.toString();
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const fromHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    return `${pathname}?${params}`;
  }, [searchParams, pathname]);

  return (
    <Box className={styles.container}>
      <BurgerButton
        isOpen={isOpen}
        className={styles.burgerBtn}
        onClick={toggleOpen}
      />

      <Box
        className={cn(styles.drawer, {
          [styles.open]: isOpen,
        })}
      >
        <Box className={styles.content}>
          <nav className={styles.navigation}>
            <List className={styles.list}>
              {NAVIGATION_CONFIG.map(({ id, title, href, param }) => {
                const hrefWithParams = param
                  ? href + '?' + getSearchParams('category', param)
                  : href;

                return (
                  <NavigationItem
                    key={id}
                    title={title}
                    href={hrefWithParams}
                    queryName={id}
                  />
                );
              })}
            </List>
          </nav>

          <Box className={styles.bottomBar}>
            <NavigationLink
              href="/favorites"
              className={styles.bottomBarBtn}
              Icon={HeartIcon}
              counter={storedQuantity.favorite}
            />

            <NavigationLink
              href="/cart"
              className={styles.bottomBarBtn}
              Icon={CartIcon}
              counter={storedQuantity.cart}
              state={{ from: fromHref }}
            />

            <ThemeButton className={styles.bottomBarBtn} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
