import { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { linksToHeader, navLinks } from '../../helpers/consts';
import { Nav } from '../Nav';

import { ReactComponent as IconHeart } from '../../images/icons/heart_like.svg';
import {
  ReactComponent as IconCart,
} from '../../images/icons/shopping_bag_cart.svg';
import { ReactComponent as Logo } from '../../images/logo.svg';

import { ShopContext } from '../../cart-context';
import { Search } from '../Search';

import './Header.scss';

export const Header: React.FC = () => {
  const { favouritesItems, cartItems } = useContext(ShopContext);

  return (
    <header className="header" id="top">
      <div className="header__container header__container--left">
        <Link to="/" className="logo header__logo">
          <Logo />
        </Link>

        <Nav navLinks={navLinks} />
      </div>

      <div className="header__container header__container--right">
        <Routes>
          {linksToHeader.map((link) => (
            <Route
              key={link}
              path={link}
              element={<Search placeholder={`search in ${link}...`} />}
            />
          ))}
        </Routes>

        <Link className="header__icon" to="favourites">
          <IconHeart />

          {!!favouritesItems.length && (
            <div className="header__items-amount">
              {`${favouritesItems.length}`}
            </div>
          )}
        </Link>

        <Link className="header__icon" to="cart">
          <IconCart />

          {!!cartItems.length && (
            <div className="header__items-amount">{`${cartItems.length}`}</div>
          )}
        </Link>
      </div>
    </header>
  );
};
