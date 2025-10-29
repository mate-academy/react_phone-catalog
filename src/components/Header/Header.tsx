import styles from './Header.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import { NavLinks } from '../NavLinks';
import { ButtonsRight } from '../ButtonsRight';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleToggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 200);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoWrapper}>
          <img src="./img/image/Logo.svg" alt="Logo" />
        </div>

        <div className={styles.navLinks}>
          <NavLinks />
        </div>
      </div>

      <div className={styles.buttonsRight}>
        <ButtonsRight />
      </div>

      <div className={styles.burgerMenu} onClick={handleToggleMenu}>
        <button>
          <img
            src={
              isMenuOpen
                ? './img/image/Icons/Close.svg'
                : '/img/image/Icons/Menu.svg'
            }
            alt="BurgerMenu"
          />
        </button>
      </div>

      {isMenuOpen && (
        <BurgerMenu isClosing={isClosing} onClose={handleToggleMenu} />
      )}
    </header>
  );
};
