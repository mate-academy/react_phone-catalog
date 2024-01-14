import { NavLink } from 'react-router-dom';
import './header.scss';
import { useContext } from 'react';
import { Logo } from '../Logo';
import { Search } from '../Search';
import { MainContext } from '../../context';

export const Header = () => {
  const {
    currentPage,
  } = useContext(MainContext);

  return (
    <header className="header">
      <div className="header__nav">
        <nav className="nav-bar">
          <Logo />
          <ul className="menu__list">
            <li className="menu__item">
              <NavLink
                to="/home"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link activ-link' : 'menu__link')}
              >
                Home
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink
                to="/phones"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link activ-link' : 'menu__link')}
              >
                Phones
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink
                to="/tablets"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link activ-link' : 'menu__link')}
              >
                Tablets
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink
                to="/accessories"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link activ-link' : 'menu__link')}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__actions">
        {currentPage !== 'Home' && <Search />}
        <div className="actions__block">
          <NavLink to="/favorites" className="favourites__icon icon" />
        </div>
        <div className="actions__block">
          <NavLink to="/cart" className="cart__icon icon" />
        </div>
      </div>
    </header>
  );
};
