import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  const getIsActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : '';

  const navLinks = [
    { to: '/', label: 'home' },
    { to: '/phones', label: 'phones' },
    { to: '/tablets', label: 'tablets' },
    { to: '/accessories', label: 'accessories' },
  ];

  const buttonsNav = [
    { to: '/favourites', img: '/img/favourites.svg', alt: 'Favourites' },
    { to: '/cart', img: '/img/cart.png', alt: 'Cart' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoWrapper}>
          <img src="/img/Logo.svg" alt="Logo" />
        </div>

        <nav className={styles.nav}>
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className={getIsActive}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={styles.buttonsRight}>
        {buttonsNav.map(link => (
          <NavLink key={link.to} to={link.to} className={getIsActive}>
            <img src={link.img} alt={link.alt} />
          </NavLink>
        ))}
      </div>

      <div className={styles.burgerMenu}>
        <NavLink to="/" className={getIsActive}>
          <img src="/img/SliderImg/Menu.svg" alt="BurgerMenu" />
        </NavLink>
      </div>
    </header>
  );
};
