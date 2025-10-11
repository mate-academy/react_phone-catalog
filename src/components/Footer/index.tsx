import { Link, NavLink } from 'react-router-dom';
import styles from '../Footer/Footer.module.scss';
import { MenuLink } from '../../types/menuLink';
// import classNames from 'classnames';

const menuLinks: MenuLink[] = [
  { to: '/', label: 'GitHub' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/right', label: 'Right' },
];

export const Footer: React.FC = () => {
  return (
    <footer className={styles.menu}>
      <div className={styles.container}>
        <div className={styles.menu__left}>
          <Link to="/" className={styles.menu__logoImg}>
            <img
              src="./img/logo/logo.png"
              alt="Nice gadgets logo"
              className={styles.logo__image}
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {menuLinks.map(link => (
              <li key={link.to} className={styles.nav__item}>
                <NavLink to={link.to} className={styles.nav__link}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.menu__icons}>
          <p className={styles.menu__iconsText}>Back to top</p>
          <a href="#" className={styles.menu__iconsTop}>
            <img
              src="./img/icons/top_button.png"
              alt="Top button"
              className={styles.nav__icons}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
