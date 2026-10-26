import { LogoVariants, NavListVariants } from '../../types/Types';
import { Logo } from '../ui/Logo/Logo';
import { NavList } from '../NavList/NavList';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Logo variant={LogoVariants.header} />
      <NavList variant={NavListVariants.header} />
    </nav>
  );
};
