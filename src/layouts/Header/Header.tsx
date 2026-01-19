import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { Logo } from '../../elements/Logo';
import { Navigation } from '../../components/Navigation';
import { NavigationAction } from '../../elements/NavigationAction';
import { useBurgerMenu } from '../../utils/hooks/Context/useBurgerMenu';
import { scrollTop } from '../../services/layouts';

export const Header = () => {
  const { isOpen: isMenuOpen, toggle, close } = useBurgerMenu();

  return (
    <header className={styles.header}>
      <Link
        onClick={() => {
          scrollTop();
          close();
        }}
        to="/"
        className={styles.header__logo}
      >
        <Logo />
      </Link>

      <Navigation />

      <NavigationAction as="button" onClick={toggle}>
        <span className={`icon icon--${isMenuOpen ? 'close' : 'burger'}`} />
      </NavigationAction>
    </header>
  );
};
