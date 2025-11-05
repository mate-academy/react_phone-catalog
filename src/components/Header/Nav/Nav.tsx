import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

export const Nav = () => {
  const getClassName = (base: string) => {
    return ({ isActive }: { isActive: boolean }) => {
      return isActive ? `${styles[base]} ${styles.active}` : styles[base];
    };
  };

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
        <NavLink className={getClassName('nav__item')} to="/accesories">
          ACCESSORIES
        </NavLink>
      </div>

      <div className={styles.container}>
        <NavLink to={'/favorites'} className={getClassName('container__link')}>
          <img
            src="img\imagess\Vector (Stroke).png"
            alt=""
            className={styles.likesImg}
          />
        </NavLink>

        <NavLink to={'/cart'} className={getClassName('container__link')}>
          <img
            src="img\imagess\Shopping bag (Cart).png"
            alt=""
            className={styles.shopingBag}
          />
        </NavLink>
      </div>
    </nav>
  );
};
