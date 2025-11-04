import type React from 'react';
import './Navbar.scss';

type NavbarProps = {
  buttonData: string;
};

export const Navbar: React.FC<NavbarProps> = ({ buttonData }) => {
  return (
    <>
      <div className="nav-mobile">
        <button className="nav__button">
          <img
            className="nav__button--icon"
            src={buttonData}
            alt="Menu button"
          />
        </button>
      </div>
    </>
  );
};
