import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { AppContext } from '../../Root';
import { AddActiveClass } from '../../types/AddActiveClass';
import { scrollToTop } from '../../utils/scrollToTop';
import { BarIcons } from '../BarIcons';
import styles from './Header.module.scss';

const addNavLinkClass: AddActiveClass = ({ isActive }) =>
  classNames(styles.navLink, {
    [styles.navLinkActive]: isActive,
  });

export const Header = () => {
  const { setIsMenuActive } = useContext(AppContext);

  return (
    <div className={styles.header}>
      <div className={styles.contentLeft}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo} onClick={scrollToTop}>
            <img
              className={styles.logoImg}
              src="img/icons/logo.svg"
              alt="Logo"
            />
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/">
                home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/phones">
                phones
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/tablets">
                tablets
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/accessories">
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.contentRight}>
        <div className={styles.verticalLine}></div>

        <div className={styles.headerBarIcons}>
          <BarIcons />
        </div>

        <button
          type="button"
          className={styles.btnMenu}
          onClick={() => setIsMenuActive(true)}
        />
      </div>
    </div>
  );
};
