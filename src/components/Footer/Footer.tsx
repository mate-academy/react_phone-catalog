import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import Logo from '../../assets/icons/Logo.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';

const footerLinks = [
  {
    to: 'https://github.com/Mitlosh/react_phone-catalog/tree/develop',
    label: 'Github',
  },
  { to: 'https://github.com/Mitlosh', label: 'Contacts' },
  { to: 'https://github.com/Mitlosh', label: 'Rights' },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <NavLink to="/">
            <img src={Logo} alt="logo" className={styles.navbar__logo} />
          </NavLink>

          <ul className={styles.menuList}>
            {footerLinks.map(({ to, label }) => (
              <li key={label} className={styles.menuList__item}>
                <NavLink
                  to={to}
                  className={styles.menuList__link}
                  target="_blank"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <NavLink to={'/'} className={styles.footer__backToTop}>
            <span className={styles.footer__backToTop_text}>Back to top</span>
            <img src={arrowRight} className={styles.footer__backToTop_icon} />
          </NavLink>
        </div>
      </div>
    </footer>
  );
};
