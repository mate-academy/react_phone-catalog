import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { Menu } from './components/Menu';
import { Navigation } from './components/Navigation';
import { Actions } from './components/Actions';
import { MainNavigation } from '../../utils/constants';
import { disableScroll, enableScroll } from '../../utils/utility';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Logo } from '../../components/Logo';
import { SvgIcon } from '../../components/SvgIcon';
import classNames from 'classnames';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <NavLink
          className={styles['header__link-logo']}
          to={MainNavigation.HOME}
        >
          <Logo className={styles.header__logo} />
        </NavLink>

        <div
          className={classNames(
            styles.header__wrapper,
            styles['header__wrapper--mobile'],
          )}
        >
          <ThemeSwitcher className={styles['header__theme-switcher']} />
          <button
            className={styles['header__menu-btn']}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="toggle menu"
          >
            {isMenuOpen ? <SvgIcon type="close" /> : <SvgIcon type="menu" />}
          </button>
        </div>

        <div className={styles['header__nav-bar']}>
          <Navigation />
          <div className={styles.header__wrapper}>
            <ThemeSwitcher className={styles['header__theme-switcher']} />
            <Actions className={styles.header__actions} />
          </div>
        </div>
      </header>

      {isMenuOpen && <Menu className={styles.header__menu} />}
    </>
  );
};
