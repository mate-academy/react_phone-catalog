import styles from './Header.module.scss';

import { IconType } from '@sTypes/IconType';

import { Nav } from '../Nav';
import { Icon } from '@components/Icon';
import { Logo } from '@components/Logo';
import { NavLinkItem } from '@components/NavLinkItem';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { menuActions } from '@features/menuSlice';
import { Counter } from '../Counter';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(state => state.menu);

  const favorites = useAppSelector(state => state.favorites);
  const shoppingCart = useAppSelector(state => state.shoppingCart);

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Logo />

        <Nav />
      </div>

      <div className={styles.header__right}>
        <NavLinkItem to="./favorites" className={styles['header__user-icon']}>
          <Icon type={IconType.favorite} />
          <Counter count={favorites.length} />
        </NavLinkItem>

        <NavLinkItem
          to="./shopping-bag"
          className={styles['header__user-icon']}
        >
          <Icon type={IconType.shoppingBag} />
          <Counter count={shoppingCart.length} />
        </NavLinkItem>
      </div>

      <div
        className={styles.header__menu}
        onClick={() => dispatch(menuActions.set(!isMenuOpen))}
      >
        <Icon type={isMenuOpen ? IconType.close : IconType.menu} />
      </div>
    </header>
  );
};
