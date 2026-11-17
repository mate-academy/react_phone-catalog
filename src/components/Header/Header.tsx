import './Header.scss';
import { Nav } from '../Nav/Nav';
import { Link, NavLink } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import { Aside } from './Aside/Aside';

export const Header = () => {
  const { favourites } = useFavourites();
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="header__logo">
        <Link to={'/'}>
          <img
            className="logo__img"
            src="../img/Logo.png"
            alt="NICE GADGETS LOGO"
          />
        </Link>
      </div>
      <div className="header__left">
        <Nav />
      </div>
      <div className="header__right">
        <NavLink className="favourites" to={'favourites'}>
          <img
            className="favourites__icon"
            src="/icons/Favourites.png"
            alt="favourites"
          />
          {favourites.length > 0 && (
            <span className="favourites__counter">{favourites.length}</span>
          )}
        </NavLink>
        <NavLink className="cart" to={'/cart'}>
          <img className="cart__icon" src="/icons/Cart.png" alt="cart" />
          {cart.length > 0 && (
            <span className="cart__counter">{cart.length}</span>
          )}
        </NavLink>
      </div>
      <div className="header__right--mobile">
        <Aside />
      </div>
    </header>
  );
};
