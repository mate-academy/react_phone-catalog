import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { NavIcons } from '../NavIcons/NavIcons';
import './Header.scss';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Search } from '../Search';
import { Location } from '../../helpers/enums';
import { isLocation } from '../../helpers/pagesMethods';

export const Header: FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);

  const [isShowSearch, setIsShowSearch] = useState(() => {
    if (isLocation(path)) {
      return Object.values(Location).includes(path);
    }

    return false;
  });

  useEffect(() => {
    setIsShowSearch(() => false);

    const newPath = location.pathname.slice(1);

    setIsShowSearch(() => {
      if (isLocation(newPath)) {
        return Object.values(Location).includes(newPath);
      }

      return false;
    });
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="header__link">
          <img
            src="./img/img/Logo.svg"
            alt="MAIN_LOGO"
            className="header__logo"
          />
        </Link>

        <NavBar />

        <BurgerMenu />
      </div>

      <div className="header__interactive">
        {isShowSearch && (
          <div className="header__search">
            <Search
              placeholder={`Search in ${path}...`}
            />
          </div>
        )}

        <div className="icons-container">
          <NavIcons />
        </div>
      </div>
    </header>
  );
};
