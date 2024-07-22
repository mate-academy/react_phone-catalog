import classNames from 'classnames';
import i18next from 'i18next';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../store/CartContext';
import { LikedContext } from '../../store/FavouritesContext';
import { Search } from '../Search';
import { Lang } from '../../types/Languages';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { ThemeContext } from '../../store/ThemeContext';
import { Nav } from '../Nav/Nav';
import { Logo } from '../Logo';
import styles from './Navbar.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';
import gStyles from '../../styles/general.module.scss';

export const Navbar = () => {
  const cartState = useContext(CartContext);
  const favouritesState = useContext(LikedContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const mobileMenuPosition = showMenu ? `0%` : `-110%`;
  const mobileMenuHeight = window.innerHeight - 49;
  const mobileMenuEvent = showMenu ? 'all' : 'none';

  const changeLang = () => {
    const nextLang = i18next.language === Lang.UK ? Lang.EN : Lang.UK;

    i18next.changeLanguage(nextLang);
  };

  return (
    <header className={styles.block}>
      <div className={styles.top}>
        <Logo />

        <div
          className={classNames(`${styles.navigation}`, {
            [gStyles.visuallyHidden]: showMenu,
          })}
        >
          <Nav />
        </div>

        <div className={styles.actions}>
          <Search hide={showMenu} />

          <button
            onClick={toggleTheme}
            className={classNames(
              `${styles.theme} ${btnStyles.block} ${btnStyles.menu}`,
              {
                [gStyles.visuallyHidden]: showMenu,
              },
            )}
            aria-label={
              theme === 'dark-theme'
                ? t(TRANSLATIONS.header.actions.theme.light.ariaLabel)
                : t(TRANSLATIONS.header.actions.theme.dark.ariaLabel)
            }
          >
            {theme === 'dark-theme' ? (
              <span className={`${iconStyles.block} ${iconStyles.sun}`}></span>
            ) : (
              <span className={`${iconStyles.block} ${iconStyles.moon}`}></span>
            )}
          </button>

          <button
            onClick={changeLang}
            className={classNames(
              `${styles.lang} ${btnStyles.block} ${btnStyles.menu}`,
              {
                [gStyles.visuallyHidden]: showMenu,
              },
            )}
            aria-label={t(TRANSLATIONS.header.actions.lang.ariaLabel)}
          >
            {t(TRANSLATIONS.header.actions.lang.text)}
          </button>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(
                `${styles.favorites} ${btnStyles.block} ${btnStyles.menu}`,
                {
                  'nav__link--active': isActive,
                  [gStyles.visuallyHidden]: showMenu,
                },
              )
            }
            aria-label={t(TRANSLATIONS.header.actions.favourites.ariaLabel)}
          >
            <span
              className={`${iconStyles.block} ${iconStyles.favorites}`}
            ></span>
            {!!favouritesState.length && (
              <div className={gStyles.counter}>{favouritesState.length}</div>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(
                `${styles.cart} ${btnStyles.block} ${btnStyles.menu}`,
                {
                  'nav__link--active': isActive,
                  [gStyles.visuallyHidden]: showMenu,
                },
              )
            }
            aria-label={t(TRANSLATIONS.header.actions.cart.ariaLabel)}
          >
            <span className={`${iconStyles.block} ${iconStyles.cart}`}></span>
            {!!cartState.length && (
              <div className={gStyles.counter}>{cartState.length}</div>
            )}
          </NavLink>
          <button
            type="button"
            className={`${styles.menu} ${btnStyles.block} ${btnStyles.menu}`}
            onClick={() => setShowMenu(!showMenu)}
            aria-label={
              showMenu
                ? t(TRANSLATIONS.header.actions.menu.ariaLabel.close)
                : t(TRANSLATIONS.header.actions.menu.ariaLabel.open)
            }
          >
            <span
              className={classNames(iconStyles.block, {
                [iconStyles.menu]: !showMenu,
                [iconStyles.close]: showMenu,
              })}
            ></span>
          </button>
        </div>
      </div>

      <div
        className={styles.mobileMenu}
        style={{
          translate: `0 ${mobileMenuPosition}`,
          height: `${mobileMenuHeight}px`,
          pointerEvents: mobileMenuEvent,
        }}
      >
        <Nav mobile />

        <div className={`${styles.actions} ${styles.actions_m_mobileMenu}`}>
          <button
            onClick={toggleTheme}
            className={`${styles.theme} ${styles.theme_m_mobileMenu} ${btnStyles.block} ${btnStyles.menu}`}
            aria-label={
              theme === 'dark-theme'
                ? t(TRANSLATIONS.header.actions.theme.light.ariaLabel)
                : t(TRANSLATIONS.header.actions.theme.dark.ariaLabel)
            }
          >
            {theme === 'dark-theme' ? (
              <span className={`${iconStyles.block} ${iconStyles.sun}`}></span>
            ) : (
              <span className={`${iconStyles.block} ${iconStyles.moon}`}></span>
            )}
          </button>

          <button
            onClick={changeLang}
            className={`${styles.lang} ${styles.lang_m_mobileMenu} ${btnStyles.block} ${btnStyles.menu}`}
            aria-label={t(TRANSLATIONS.header.actions.lang.ariaLabel)}
          >
            {t(TRANSLATIONS.header.actions.lang.text)}
          </button>

          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(
                `${styles.favorites} ${styles.favorites_m_mobileMenu} ${btnStyles.block} ${btnStyles.menu}`,
                {
                  'nav__link--active': isActive,
                },
              )
            }
            onClick={() => setShowMenu(false)}
            aria-label={t(TRANSLATIONS.header.actions.favourites.ariaLabel)}
          >
            <span
              className={`${iconStyles.block} ${iconStyles.favorites}`}
            ></span>
            {!!favouritesState.length && (
              <div
                className={`${gStyles.counter} ${gStyles.counter_m_mobileMenu}`}
              >
                {favouritesState.length}
              </div>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(
                `${styles.cart} ${styles.cart_m_mobileMenu} ${btnStyles.block} ${btnStyles.menu}`,
                {
                  'nav__link--active': isActive,
                },
              )
            }
            onClick={() => setShowMenu(false)}
            aria-label={t(TRANSLATIONS.header.actions.cart.ariaLabel)}
          >
            <span className={`${iconStyles.block} ${iconStyles.cart}`}></span>
            {!!cartState.length && (
              <div
                className={`${gStyles.counter} ${gStyles.counter_m_mobileMenu}`}
              >
                {cartState.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
