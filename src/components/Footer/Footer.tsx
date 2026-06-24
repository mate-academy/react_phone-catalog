import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { BackToTopButton } from '../BackToTopButton';
import { useTheme } from '../../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const logoUrl = `img/icons/NiceGadgets-${theme}.png`;

  return (
    <div className={styles.footer}>
      <Link className={styles.footer__logo} to="/">
        <img src={logoUrl} alt="Logo" />
      </Link>

      <nav className={styles.footer__nav}>
        <NavLink
          to="https://github.com/kondratiukD"
          className={styles.footer__navLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </NavLink>
        <NavLink className={styles.footer__navLink} to="/contacts">
          Contacts
        </NavLink>
        <NavLink className={styles.footer__navLink} to="/rights">
          rights
        </NavLink>
      </nav>

      <BackToTopButton />
    </div>
  );
};
