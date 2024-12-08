import { useMemo } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

import CartIcon from '@assets/images/icons/cart-icon.svg?react';
import HeartIcon from '@assets/images/icons/heart-icon.svg?react';

import { Box } from '@shared/base/Box';
import { List } from '@shared/base/List';
import { useStoredProducts } from '@shared/contexts/StoredProducts';

import styles from './DesktopNavigation.module.scss';
import { NAVIGATION_CONFIG } from '../../utils/navigation.config';
import { NavigationItem } from '../NavigationItem';
import { NavigationLink } from '../NavigationLink';
import { ThemeButton } from '../ThemeButton';

export const DesktopNavigation = () => {
  const { storedQuantity } = useStoredProducts();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const getSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    return params.toString();
  };

  const fromHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    return `${pathname}?${params}`;
  }, [searchParams, pathname]);

  return (
    <Box className={styles.container}>
      <nav className={styles.navigation}>
        <List className={styles.list}>
          {NAVIGATION_CONFIG.map(({ id, title, href, param }) => {
            const hrefWithParams = param
              ? href + '?' + getSearchParams('category', param)
              : href;

            return (
              <NavigationItem
                key={id}
                queryName={id}
                title={title}
                href={hrefWithParams}
                link={{ className: styles.link }}
              />
            );
          })}
        </List>
      </nav>

      <Box className={styles.buttons}>
        <NavigationLink
          href="/favorites"
          className={styles.btn}
          Icon={HeartIcon}
          counter={storedQuantity.favorite}
        />

        <NavigationLink
          href="/cart"
          className={styles.btn}
          Icon={CartIcon}
          counter={storedQuantity.cart}
          state={{
            from: fromHref,
          }}
        />

        <ThemeButton className={styles.btn} />
      </Box>
    </Box>
  );
};
