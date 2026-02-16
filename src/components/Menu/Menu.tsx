import { TopBar } from '../TopBar';
import { Navigation } from '../Navigation';

import styles from './Menu.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuProvider';

export const Menu = () => {
  const { isMenuVisible } = useContext(MenuContext);

  const getStyleMenu = () => {
    return classNames(styles.menu, {
      [styles['menu--show']]: isMenuVisible,
    });
  };

  return (
    <aside className={getStyleMenu()} id="menu">
      <TopBar icon="close" classNameProp={styles['menu__top-bar']} />
      <Navigation
        classNamesProps={[styles.menu__nav, styles.menu__favorites]}
      />
    </aside>
  );
};
