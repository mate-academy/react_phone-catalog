import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../Menu/Menu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  //#region handleFunctions
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //#endregion

  return (
    <header>
      <Link to="/">
        <img src="/img/logo/logo.png" alt="Nice Gadgets Logo" />
      </Link>
      <button type="button" onClick={handleToggleMenu}>
        <img src="/img/burger_menu/burger_menu.png" alt="Burger Menu" />
      </button>
      {isOpen && <Menu onClose={() => setIsOpen(false)} />}
    </header>
  );
};
