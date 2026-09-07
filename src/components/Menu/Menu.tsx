import { useContext } from 'react';
import classNames from 'classnames';

import styles from './Menu.module.scss';
import { MenuContext } from '../../context/MenuProvider';
import { Topbar } from '../Topbar';
import { Navigation } from '../Navigation';

export const Menu = () => {
  const { isMenuVisible } = useContext(MenuContext);

  const getStyleMenu = () => {
    return classNames(styles.menu, {
      [styles['menu--show']]: isMenuVisible,
    });
  };

  return (
    <aside className={getStyleMenu()} id="menu">
      <Topbar icon="close" classNameProp={styles['menu__top-bar']} />
      <Navigation
        classNamesProps={[styles.menu__nav, styles.menu__favorites]}
      />
    </aside>
  );
};
