import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { getClassLink } from '../../utils/activeClassName';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logoLink}>
          <img
            src="src/assets/icons/header-icons/logo-icon.svg"
            alt="Логотип"
            className={styles.header__logo}
          />
        </Link>

        <nav className={styles.header__nav}>
          <ul className={styles.header__list}>
            <li className={styles.header__item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__wrapper}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              getClassLink({
                isActive,
                baseClass: styles.header__favoritesLink,
                activeClass: styles.header__imageLinkActive,
              })
            }
          >
            <img
              src="src/assets/icons/header-icons/favorites-icon.svg"
              alt="Відкрити улюблені товари"
              className={styles.header__favoritesImg}
            />
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              getClassLink({
                isActive,
                baseClass: styles.header__cartLink,
                activeClass: styles.header__imageLinkActive,
              })
            }
          >
            <img
              src="src/assets/icons/header-icons/cart-icon.svg"
              alt="Відкрити корзину"
              className={styles.header__cartImg}
            />
          </NavLink>
          <button
            className={getClassLink({
              isActive: true,
              baseClass: styles.header__menuLink,
              activeClass: styles.header__imageLinkActive,
            })}
          >
            <img
              src="src/assets/icons/header-icons/hamburger-icon.svg"
              alt="Відкрити меню"
              className={styles.header__menuImg}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
