import styles from './Header.module.scss';

import { IconType } from '@sTypes/IconType';

import { Nav } from '../Nav';
import { Icon } from '@components/Icon';
import { Logo } from '@components/Logo';
import { NavLinkItem } from '@components/NavLinkItem';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <div className={styles.header__logo}>
          <Logo />
        </div>

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

      <div className={styles.header__menu}>
        <Icon type={IconType.menu} />
      </div>
    </header>
  );
};
