import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { useFavorites } from '../../../Utills/FavoritesContext';
import { useProductInCart } from '../../../Utills/ShopingCartContext';

export const Nav = () => {
  const { favorites } = useFavorites();
  const { state } = useProductInCart();

  const getClassName = (base: string) => {
    return ({ isActive }: { isActive: boolean }) => {
      return isActive ? `${styles[base]} ${styles.active}` : styles[base];
    };
  };

  const totalImems = state.reduce((acum, elem) => acum + elem.quantity, 0);

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__links}>
        <NavLink className={getClassName('nav__item')} to="/">
          HOME
        </NavLink>
        <NavLink className={getClassName('nav__item')} to="/phones">
          PHONES
        </NavLink>

        <NavLink className={getClassName('nav__item')} to="/tablets">
          TABLETS
        </NavLink>
        <NavLink className={getClassName('nav__item')} to="/accessories">
          ACCESSORIES
        </NavLink>
      </div>

      <div className={styles.container}>
        <NavLink to={'/favorites'} className={getClassName('container__link')}>
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

        <NavLink to={'/cart'} className={getClassName('container__link')}>
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
  );
};
