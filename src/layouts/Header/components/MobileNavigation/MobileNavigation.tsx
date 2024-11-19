import { useState } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import CartIcon from '@assets/images/icons/cart-icon.svg?react';
import HeartIcon from '@assets/images/icons/heart-icon.svg?react';

import { Box } from '@shared/base/Box';
import { List } from '@shared/base/List';
import { ListItem } from '@shared/base/ListItem';
import { Text } from '@shared/base/Text';
import { useStoredProducts } from '@shared/contexts/StoredProducts';

import styles from './MobileNavigation.module.scss';
import { NAVIGATION_CONFIG } from '../../utils/navigation.config';
import { BurgerButton } from '../BurgerButton';
import { NavigationLink } from '../NavigationLink';
import { ThemeButton } from '../ThemeButton';

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { storedQuantity } = useStoredProducts();

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

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
              {NAVIGATION_CONFIG.map(({ id, title, href }) => (
                <ListItem key={id} id={id}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      cn(styles.link, {
                        [styles.active]: isActive,
                      })
                    }
                  >
                    <Text variant="uppercase" className={styles.text}>
                      {title}
                    </Text>
                  </NavLink>
                </ListItem>
              ))}
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
            />

            <ThemeButton className={styles.bottomBarBtn} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
