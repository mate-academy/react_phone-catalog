import { useState } from 'react';
import { LOCAL_URL } from '../../api/apiProducts';
import './Header.scss';
import { Logo } from '../Logo';
import { NavBar } from '../NavBar/NavBar';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleNavLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <Logo className="header__logo" />

      <NavBar
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleMenuToggle}
        onToggleLink={handleNavLinkClick}
      />

      <div className="header__actions">
        <button
          className="
            header__actions-button
            header__actions-button--menu
          "
          onClick={handleMenuToggle}
        >
          <img
            src={`${LOCAL_URL}/icons/burger-icon.svg`}
            alt="Menu"
            className="icon"
          />
        </button>
      </div>
    </header>
  );
};
