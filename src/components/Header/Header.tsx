import styles from './header.module.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useProductActions } from '../../context/ProductActionsContext';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { liked, cart } = useProductActions();

  const isMenuPage = location.pathname === '/menu';

  const handleClick = () => {
    if (isMenuPage) {
      navigate(-1);
    } else {
      navigate('/menu', {
        state: { from: location.pathname },
      });
    }
  };

  return (
    <nav className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__items}>
          <div className={styles.header__logo}>
            <Link to="/">
              <img
                className={`${styles.header__logo__img} ${styles.lightIcon}`}
                src={`${import.meta.env.BASE_URL}/img/Logo.svg`}
                alt="logo nice gadgets"
              />
              <img
                className={`${styles.header__logo__img} ${styles.darkIcon}`}
                src={`${import.meta.env.BASE_URL}/img/icons-dark/Logo.svg`}
                alt="logo nice gadgets"
              />
            </Link>
          </div>

          <div className={styles.header__menu_items}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.header__item} ${isActive ? styles.activeLink : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.header__item} ${isActive ? styles.activeLink : ''}`
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.header__item} ${isActive ? styles.activeLink : ''}`
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.header__item} ${isActive ? styles.activeLink : ''}`
              }
            >
              Accessories
            </NavLink>
          </div>
        </div>

        <div className={styles.header__toggle}>
          <ThemeToggle />
        </div>
      </div>

      <div className={styles.header__menu}>
        <button onClick={handleClick}>
          <img
            className={`${styles.header__menu__img} ${styles.lightIcon}`}
            src={
              isMenuPage
                ? `${import.meta.env.BASE_URL}/img/icons/Close.svg`
                : `${import.meta.env.BASE_URL}/img/icons/Menu.svg`
            }
            alt="icon menu"
          />
          <img
            className={`${styles.header__menu__img} ${styles.darkIcon}`}
            src={
              isMenuPage
                ? `${import.meta.env.BASE_URL}/img/icons-dark/Close.svg`
                : `${import.meta.env.BASE_URL}/img/icons-dark/Menu.svg`
            }
            alt="icon menu"
          />
        </button>
      </div>

      <div className={styles.header__icon}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.header__icons} ${isActive ? styles.activeLink : ''}`
          }
        >
          <img
            className={`${styles.header__icons__img} ${styles.lightIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons/HeartLike.svg`}
            alt="icon heart like"
          />
          <img
            className={`${styles.header__icons__img} ${styles.darkIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons-dark/Favourites.svg`}
            alt="icon heart like"
          />

          {liked.length > 0 && (
            <span className={styles.header__length}>{liked.length}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.header__icons} ${isActive ? styles.activeLink : ''}`
          }
        >
          <img
            className={`${styles.header__icons__img} ${styles.lightIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons/ShoppingBag.svg`}
            alt="icon shopping bag"
          />
          <img
            className={`${styles.header__icons__img} ${styles.darkIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons-dark/Shopping-bag.svg`}
            alt="icon shopping bag"
          />

          {cart.length > 0 && (
            <span className={styles.header__length}>{cart.length}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
