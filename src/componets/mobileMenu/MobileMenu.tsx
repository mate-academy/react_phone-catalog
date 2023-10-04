import React from 'react';
import './MobileMenu.scss';
import { NavLink } from 'react-router-dom';

type MobileMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, closeMenu }) => {
  const menuStyle = isOpen ? { display: 'block' } : { display: 'none' };

  return (
    <div className="mobile-menu" style={menuStyle}>
      <NavLink
        to="/"
        onClick={closeMenu}
        className="mobile-menu__links"
      >
        Home
      </NavLink>
      <NavLink
        to="/phones"
        onClick={closeMenu}
        className="mobile-menu__links"
      >
        Phones
      </NavLink>
      <NavLink
        to="/tablets"
        onClick={closeMenu}
        className="mobile-menu__links"
      >
        Tablets
      </NavLink>
      <NavLink
        to="/accessories"
        onClick={closeMenu}
        className="mobile-menu__links"
      >
        Accessories
      </NavLink>
    </div>
  );
};

export default MobileMenu;
