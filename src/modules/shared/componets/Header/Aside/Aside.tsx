import { Link, NavLink } from 'react-router-dom';
import styles from './Aside.module.scss';
import { useFavorites } from '../../../Utills/FavoritesContext';
import { useProductInCart } from '../../../Utills/ShopingCartContext';

type Props = {
  toggleMenu: () => void;
};

export const Aside: React.FC<Props> = ({ toggleMenu }) => {
  const { favorites } = useFavorites();
  const { state } = useProductInCart();

  const totalImems = state.reduce((acum, elem) => acum + elem.quantity, 0);

  const getClassName = (base: string) => {
    return ({ isActive }: { isActive: boolean }) => {
      return isActive ? `${styles[base]} ${styles.active}` : styles[base];
    };
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.aside__header}>
        <Link to="/" className={styles.aside__link}>
          <img
            src="img/imagess/Logo.png"
            alt="logo"
            className={styles.aside__logo}
          ></img>
        </Link>

        <div className={styles.button} onClick={toggleMenu}>
          <div className={styles['button__close-icon']}></div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.nav__links}>
          <NavLink
            className={getClassName('nav__item')}
            to="/"
            onClick={toggleMenu}
          >
            HOME
          </NavLink>
          <NavLink
            className={getClassName('nav__item')}
            to="/phones"
            onClick={toggleMenu}
          >
            PHONES
          </NavLink>

          <NavLink
            className={getClassName('nav__item')}
            to="/tablets"
            onClick={toggleMenu}
          >
            TABLETS
          </NavLink>
          <NavLink
            className={getClassName('nav__item')}
            to="/accesories"
            onClick={toggleMenu}
          >
            ACCESSORIES
          </NavLink>
        </div>

        <div className={styles.container}>
          <NavLink
            to={'/favorites'}
            className={getClassName('container__link')}
            onClick={toggleMenu}
          >
            <span className={styles.icon__wrapper}>
              <img
                src="img\imagess\Vector(Stroke).png"
                alt=""
                className={styles.likesImg}
              />
              {favorites.length > 0 && (
                <span className={styles.counter}>{favorites.length}</span>
              )}
            </span>
          </NavLink>

          <NavLink
            to={'/cart'}
            className={getClassName('container__link')}
            onClick={toggleMenu}
          >
            <span className={styles.icon__wrapper}>
              <img
                src="img\imagess\Shopping bag (Cart).png"
                alt=""
                className={styles.shopingBag}
              />

              {totalImems > 0 && (
                <span className={styles.counter}>{totalImems}</span>
              )}
            </span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};
