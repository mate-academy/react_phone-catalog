import { NavLink } from 'react-router-dom';
import './header.scss';
import { useContext } from 'react';
import { Logo } from '../Logo';
import { Search } from '../Search';
import { MainContext } from '../../context';

export const Header = () => {
  const {
    currentPage,
    cartItems,
    favouritesItems,
  } = useContext(MainContext);

  return (
    <header className="header">
      <div className="header__nav">
        <nav className="nav-bar">
          <Logo />
          <ul className="menu__list">
            <li className="menu__item">
              <NavLink
                to="/"
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
        {(currentPage !== 'Home'
         && currentPage !== 'Cart'
         && currentPage !== 'ProductDetails'
        ) && <Search />}
        <div className="actions__block">
          <NavLink
            to="/favorites"
            className={(
              { isActive },
            ) => (isActive
              ? 'favourites__icon icon active-block'
              : 'favourites__icon icon')}
          >
            {favouritesItems.length !== 0
              && <div className="items__amount">{favouritesItems.length}</div>}

          </NavLink>
        </div>
        <div className="actions__block">
          <NavLink
            to="/cart"
            className={(
              { isActive },
            ) => (isActive
              ? 'cart__icon icon active-block'
              : 'cart__icon icon')}
          >
            {cartItems.length !== 0
             && <div className="items__amount">{cartItems.length}</div>}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
