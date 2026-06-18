import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import styles from './Header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  //#region handleFunctions
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //#endregion

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/img/logo/logo.png" alt="Nice Gadgets Logo" />
      </Link>
      <button
        type="button"
        onClick={handleToggleMenu}
        className={styles.button}
      >
        <img src="/img/burger_menu/burger_menu.png" alt="Burger Menu" />
      </button>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
};
