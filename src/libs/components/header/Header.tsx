import { useLocation } from 'react-router-dom';

import './styles.scss';

import { Navbar } from '../navbar/Navbar';
import { NavbarSearch } from '../navbar-search/NavbarSearch';
import { NavbarControls } from '../navbar-controls/NavbarControls';
import { Logo } from '../logo/Logo';
import { navbarLinks } from '../navbar/libs/enums/navbar-links.enum';
import { routesWithSearchbar } from './enums/routes-with-searchbar.enum';
import { AppRoutes } from '../../enums';

export const Header: React.FC = () => {
  const { pathname } = useLocation();

  const isShowNavbarSearch = routesWithSearchbar
    .includes(pathname as AppRoutes);

  return (
    <header className="header">
      <Logo className="header__logo" />

      <div className="header__navbar">
        <div className="header__navbar-left">
          <Navbar links={navbarLinks} isHeader />
        </div>

        <div className="header__navbar-right">
          { isShowNavbarSearch && <NavbarSearch /> }

          <NavbarControls />
        </div>
      </div>
    </header>
  );
};
