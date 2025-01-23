import { useCallback, useContext } from 'react';

import styles from './MenuNav.module.scss';

import { NavLinkItem } from '@components/NavLinkItem';

import { DispatchMenuContext } from '@store/MenuStore';

import { LINKS } from '@App/constants/Links';

export const MenuNav = () => {
  const dispatchMenu = useContext(DispatchMenuContext);

  const changePage = useCallback(() => {
    window.scrollTo(0, 0);
    dispatchMenu({ type: 'set', payload: false });
  }, [dispatchMenu]);

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
