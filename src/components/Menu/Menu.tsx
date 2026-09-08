import classNames from 'classnames';
import styles from './Menu.module.scss';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuProvider';
import { Topbar } from '../Topbar';
import { Navigation } from '../Navigation';

export const Menu = () => {
  const { isVisibleMenu } = useContext(MenuContext);

  const getMenuStyle = () => {
    return classNames(styles.menu, {
      [styles[`menu--show`]]: isVisibleMenu,
    });
  };

  return (
    <aside className={getMenuStyle()} id="menu">
      <Topbar icon="close" classNameProp={styles['menu__top-bar']} />
      <Navigation classNamesProps={[styles.menu__nav, styles.menu__actions]} />
    </aside>
  );
};
