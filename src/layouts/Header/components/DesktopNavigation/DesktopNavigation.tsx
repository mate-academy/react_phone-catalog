import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import CartIcon from '@assets/images/icons/cart-icon.svg?react';
import HeartIcon from '@assets/images/icons/heart-icon.svg?react';

import { Box } from '@shared/base/Box';
import { List } from '@shared/base/List';
import { ListItem } from '@shared/base/ListItem';
import { Text } from '@shared/base/Text';

import styles from './DesktopNavigation.module.scss';
import { NAVIGATION_CONFIG } from '../../utils/navigation.config';
import { NavigationLink } from '../NavigationLink';
import { ThemeButton } from '../ThemeButton';

export const DesktopNavigation = () => (
  <Box className={styles.container}>
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

    <Box className={styles.buttons}>
      <NavigationLink
        href="/favorites"
        className={styles.btn}
        Icon={HeartIcon}
      />

      <NavigationLink href="/cart" className={styles.btn} Icon={CartIcon} />

      <ThemeButton className={styles.btn} />
    </Box>
  </Box>
);
