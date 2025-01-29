import classNames from 'classnames';
import { useCallback, useEffect } from 'react';

import styles from './Menu.module.scss';

import { IconType } from '@sTypes/IconType';

import { MenuNav } from '../MenuNav';
import { Icon } from '@components/Icon';
import { NavLinkItem } from '@components/NavLinkItem';

import { menuActions } from '@features/menuSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export const Menu = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(state => state.menu);

  // disable scrolling while menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = '';
    }
  }, [isMenuOpen]);

  const changePage = useCallback(() => {
    window.scrollTo(0, 0);
    dispatch(menuActions.set(false));
  }, [dispatch]);

  return (
    <aside
      className={classNames(styles.menu, {
        [styles['menu--open']]: isMenuOpen,
      })}
    >
      <div className={styles.menu__content}>
        <div className={styles.menu__top}>
          <MenuNav />
        </div>

        <div className={styles.menu__bottom}>
          <NavLinkItem to="./favorite" onClick={changePage}>
            <Icon type={IconType.favorite} wide />
          </NavLinkItem>

          <NavLinkItem to="./shopping-bag" onClick={changePage}>
            <Icon type={IconType.shoppingBag} wide />
          </NavLinkItem>
        </div>
      </div>
    </aside>
  );
};
