import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '../../Components/Menu/Menu';
import { Tabs } from '../../Components/Tabs/Tabs';
import './NavBar.scss';

type Props = {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

export const NavBar: React.FC<Props> = ({ setSearchInput }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="NavBar">
        <div className="NavBar__wrapper">
          <div className="NavBar__left">
            <Link to="/" className="NavBar__link tablet__hidden">
              <img
                src="./assets/LOGO.svg"
                alt="logo"
                className="NavBar__logo"
              />
            </Link>
            <button
              type="button"
              className="tablet__menuBtn"
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <img
                src="./assets/menuIcon.svg"
                alt="menuBtn"
                className="tablet__menuImg"
              />
            </button>
            <Menu
              location={location.pathname}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          </div>
          <div className="NavBar__right">
            <Tabs
              setSearchInput={setSearchInput}
              location={location.pathname}
            />
          </div>
        </div>
      </div>
    </>
  );
};
