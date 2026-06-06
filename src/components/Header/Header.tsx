import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { BurgerButton } from './components/BurgerButton';
import { BurgerMenu } from './components/BurgerMenu';
import { Nav } from './components/Nav';
import { HeaderIcons } from '../icons/HeaderIcons';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src="/img/header/LogoLarge.svg"
            alt="Nice Gadgets"
            className={styles.logoImg}
          />
        </Link>

        <BurgerButton
          isMenuOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(prev => !prev)}
        />

        <Nav />
        <HeaderIcons className={styles.icons} classIcon={styles.icon} />

        {isMenuOpen && <BurgerMenu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </header>
  );
};
