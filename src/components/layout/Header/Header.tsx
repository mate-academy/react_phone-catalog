import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { CounterIcon } from './CounterIcon/CounterIcon';
import styles from './Header.module.scss';

import heartIcon from '@assets/icons/heart.svg';
import cartIcon from '@assets/icons/cart.svg';
import userIcon from '@assets/icons/user.svg';
import logoDark from '@assets/icons/logo-dark.png';
import logoLight from '@assets/icons/logo-light.png';
import { useAppContext } from '@hooks/useAppContext';
import { Search } from './Search/Search';
import { AuthModal } from '@components/common/AuthModal';
import { supabase } from '@utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { totalItems, favoritesCount } = useAppContext();

  const navLinks = [
    { id: 1, name: t('nav.home'), path: '/' },
    { id: 2, name: t('nav.phones'), path: '/phones' },
    { id: 3, name: t('nav.tablets'), path: '/tablets' },
    { id: 4, name: t('nav.accessories'), path: '/accessories' },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const fetchAdmin = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
    setIsAdmin(data?.is_admin ?? false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchAdmin(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__left}>
            <Link
              to="/"
              className={styles.header__logo}
              onClick={closeMenu}
            >
              <img
                src={theme === 'light' ? logoLight : logoDark}
                alt="Voltrix"
              />
            </Link>

            <nav className={styles.header__nav}>
              <ul className={styles.nav_list}>
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={styles.nav_list__item}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ?
                          `${styles.nav_list__link} ${styles['nav_list__link--active']}`
                        : styles.nav_list__link
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.header__right}>
            <div className={styles.lang_switcher}>
              <button
                className={`${styles.lang_btn} ${i18n.language === 'en' ? styles['lang_btn--active'] : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <span className={styles.lang_divider}>|</span>
              <button
                className={`${styles.lang_btn} ${i18n.language === 'ua' ? styles['lang_btn--active'] : ''}`}
                onClick={() => changeLanguage('ua')}
              >
                UA
              </button>
            </div>
            <Search />
            <div className={styles.header__icons}>
              <div className={styles.header__theme}>
                <ThemeSwitcher
                  theme={theme}
                  setTheme={setTheme}
                />
              </div>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ?
                    `${styles.icon_btn} ${styles['icon_btn--user']} ${styles['icon_btn--active']}`
                  : `${styles.icon_btn} ${styles['icon_btn--user']}`
                }
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    setIsAuthModalOpen(true);
                  }
                  closeMenu();
                }}
              >
                <img
                  src={userIcon}
                  alt="Profile"
                />
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ?
                    `${styles.icon_btn} ${styles['icon_btn--active']}`
                  : styles.icon_btn
                }
                onClick={closeMenu}
              >
                <CounterIcon
                  icon={heartIcon}
                  count={favoritesCount}
                  alt="Favorites"
                />
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ?
                    `${styles.icon_btn} ${styles['icon_btn--active']}`
                  : styles.icon_btn
                }
                onClick={closeMenu}
              >
                <CounterIcon
                  icon={cartIcon}
                  count={totalItems}
                  alt="Cart"
                />
              </NavLink>
              <button
                className={styles.header__burger}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div
                  className={`${styles.burger_icon} ${isMenuOpen ? styles['burger_icon--active'] : ''}`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </header>

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        favoritesCount={favoritesCount}
        cartCount={totalItems}
        user={user}
        isAdmin={isAdmin}
      />
    </>
  );
};
