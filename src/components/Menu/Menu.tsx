import styles from './Menu.module.scss';

import classNames from 'classnames';

import { Navigation } from '../Navigation';
import { HeaderActions } from '../HeaderActions';
import { useMenu, useMenuDispatch } from '../../context/useMenu';

export const Menu = () => {
  const { isMenuOpen } = useMenu();
  const dispatch = useMenuDispatch();

  const closeMenu = () => {
    dispatch({ type: 'CLOSE_MENU' });
  };

  const handleCloseMenu = () => {
    closeMenu();
  };

  return (
    <aside
      className={classNames(styles.menu, {
        [styles['menu--open']]: isMenuOpen,
        [styles['menu--closed']]: !isMenuOpen,
      })}
    >
      <Navigation onLinkClick={handleCloseMenu} />
      <div className={styles.menu__headerActions}>
        <HeaderActions onActionClick={closeMenu} />
      </div>
    </aside>
  );
};
