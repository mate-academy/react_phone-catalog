import React from 'react';
import classNames from 'classnames';

import { IconType } from '@sTypes/IconType';

import { Nav } from '../Nav';
import { Icon } from '@components/Icon';
import { Logo } from '@components/Logo';
import { SearchInput } from '../SearchInput';
import { NavLinkItem } from '@components/NavLinkItem';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { menuActions } from '@features/menuSlice';
import { Counter } from '../Counter';

import styles from './Header.module.scss';
import { useLoweredLocation } from '@hooks/useLoweredLocation';

type Props = {
  className?: string;
};

export const Header: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(state => state.menu);

  const favorites = useAppSelector(state => state.favorites);
  const shoppingCart = useAppSelector(state => state.cart);

  const { pathname } = useLoweredLocation();

  const isCategoryPage = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(pathname);

  return (
    <header className={classNames(className, styles.header)}>
      <div className={styles.header__left}>
        <Logo />
        <Nav />
      </div>

      <div
        className={classNames(styles.header__search, {
          [styles['header__search--hidden']]: !isCategoryPage,
        })}
      >
        <SearchInput />
      </div>

      <div className={styles.header__right}>
        <NavLinkItem
          to="./favorites"
          aria-label="Favorites"
          className={styles['header__user-icon']}
        >
          <Icon type={IconType.favorite} />
          <Counter count={favorites.length} />
        </NavLinkItem>

        <NavLinkItem
          to="./cart"
          aria-label="Shopping Bag"
          className={styles['header__user-icon']}
        >
          <Icon type={IconType.shoppingBag} />
          <Counter count={shoppingCart.length} />
        </NavLinkItem>
      </div>

      <Icon
        className={styles.header__menu}
        onClick={() => dispatch(menuActions.set(!isMenuOpen))}
        type={isMenuOpen ? IconType.close : IconType.menu}
      />
    </header>
  );
};
