/* eslint-disable jsx-a11y/anchor-has-content */
import './styles.scss';
import { useLocation } from 'react-router-dom';
import { Cart } from '../Cart';
import { Favorites } from '../Favorites';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { Search } from '../Search';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const isNav = pathname !== '/cart';
  const visibleSearchArray = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ];
  const isSearch = visibleSearchArray.includes(pathname);

  return (
    <header className="header page__section">
      <div className="header__content content-header">
        <div className="
          content-header__part
          content-header__part--left"
        >
          <Logo />

          { isNav && <Nav />}
        </div>

        <div className="
          content-header__part
          content-header__part--right"
        >
          {isSearch && <Search />}

          <Favorites />

          <Cart />
        </div>
      </div>
    </header>
  );
};
