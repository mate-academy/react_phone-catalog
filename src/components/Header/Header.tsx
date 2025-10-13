import styles from './Header.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import { NavLinks } from '../NavLinks';
import { ButtonsRight } from '../ButtonsRight';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getIsActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : '';

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoWrapper}>
          <img src="/img/Logo.svg" alt="Logo" />
        </div>

        <div className={styles.navLinks}>
          <NavLinks />
        </div>
      </div>

      <ButtonsRight getIsActive={getIsActive} />

      <div
        className={styles.burgerMenu}
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <button>
          <img src="/img/SliderImg/Menu.svg" alt="BurgerMenu" />
        </button>
      </div>

      {isMenuOpen && (
        <BurgerMenu
          getIsActive={getIsActive}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};
