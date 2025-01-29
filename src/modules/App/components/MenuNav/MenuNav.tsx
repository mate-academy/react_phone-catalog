import { useCallback } from 'react';

import styles from './MenuNav.module.scss';

import { NavLinkItem } from '@components/NavLinkItem';

import { useAppDispatch } from '@store/hooks';
import { menuActions } from '@features/menuSlice';

import { LINKS } from '@App/constants/Links';

export const MenuNav = () => {
  const dispatch = useAppDispatch();

  const changePage = useCallback(() => {
    window.scrollTo(0, 0);
    dispatch(menuActions.set(false));
  }, [dispatch]);

  return (
    <nav className={styles['menu-nav']}>
      <ul className={styles['menu-nav__items']}>
        {LINKS.map(link => (
          <li key={link[0]}>
            <NavLinkItem to={link[0]} onClick={changePage} fixedPadding>
              {link[1]}
            </NavLinkItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};
