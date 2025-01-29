import styles from './Header.module.scss';

import { IconType } from '@sTypes/IconType';

import { Nav } from '../Nav';
import { Icon } from '@components/Icon';
import { Logo } from '@components/Logo';
import { NavLinkItem } from '@components/NavLinkItem';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { menuActions } from '@features/menuSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(state => state.menu);

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Logo />

        <Nav />
      </div>

      <div className={styles.header__right}>
        <NavLinkItem to="./favorite">
          <Icon type={IconType.favorite} />
        </NavLinkItem>

        <NavLinkItem to="./shopping-bag">
          <Icon type={IconType.shoppingBag} />
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
