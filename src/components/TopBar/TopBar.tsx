import { getActiveClass } from '../../utils/getActiveClass';
import { useCart } from '../Cart/CartContext';
import { useFavorites } from '../Favorites/FavoritesContext';
import { NavBar } from '../NavBar';
import './TopBar.scss';
import { Link, NavLink } from 'react-router-dom';

const heartClass = getActiveClass('icon icon--heart top-bar__shopping-heart');
const bagClass = getActiveClass('icon icon--bag top-bar__shopping-bag');

export const TopBar = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();

  return (
    <div className="top-bar">
      <Link to="/" className="icon icon--logo top-bar__logo"></Link>

      <NavLink to="/menu" className="icon icon--menu top-bar__menu"></NavLink>

      <div className="top-bar__nav">
        <NavBar />
      </div>

      <div className="top-bar__shopping">
        <NavLink to="/favorites" className={heartClass}>
          <span className="top-bar__shopping-badge">{favorites.length}</span>
        </NavLink>

        <NavLink to="/cart" className={bagClass}>
          <span className="top-bar__shopping-badge">{cart.length}</span>
        </NavLink>
      </div>
    </div>
  );
};
