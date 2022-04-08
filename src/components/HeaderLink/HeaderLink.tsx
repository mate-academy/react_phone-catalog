import { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

// Styles
import './HeaderLink.scss';

// Contexts
import { FavouritesContext } from '../../contexts/FavoritesProvider';
import { CartContext } from '../../contexts/CartProvider';

type Props = {
  item: string;
};

export const HeaderLink: FunctionComponent<Props> = ({ item }) => {
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  const count = item === 'Favourites'
    ? favourites.length
    : cart.length;

  const url = item === 'Home'
    ? '/'
    : item.toLowerCase();

  return (
    <NavLink
      to={url}
      className={({ isActive }) => (isActive ? 'HeaderLink HeaderLink--active' : 'HeaderLink')}
    >
      {item !== 'Favourites' && item !== 'Cart'
        ? item
        : (
          <div className={classNames('HeaderLink__icon', { 'HeaderLink__icon HeaderLink__icon--cart': item === 'Cart' })}>
            {!!count && (
              <div className="HeaderLink__count">
                {count}
              </div>
            )}
          </div>
        )}
    </NavLink>
  );
};
