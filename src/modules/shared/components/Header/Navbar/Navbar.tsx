import { NAV_LINKS } from '../../../constants/navLinks';
import { NavLinkItem } from '../NavLinkItem/NavLInkItem';
import styles from '../Header.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar__list}>
      {NAV_LINKS.map(link => (
        <NavLinkItem key={link.label} to={link.to} label={link.label} />
      ))}
    </nav>
  );
};
