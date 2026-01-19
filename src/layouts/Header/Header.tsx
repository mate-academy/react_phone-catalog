import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { Logo } from '../../elements/Logo';
import { Navigation } from '../../components/Navigation';
import { NavigationAction } from '../../elements/NavigationAction';
import { useBurgerMenu } from '../../utils/hooks/Context/useBurgerMenu';

export const Header = () => {
  const { isOpen: isMenuOpen, toggle } = useBurgerMenu();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__logo}>
        <Logo />
      </Link>

      <Navigation />

      <NavigationAction as="button" onClick={toggle}>
        <span className={`icon icon--${isMenuOpen ? 'close' : 'burger'}`} />
      </NavigationAction>
    </header>
  );
};
