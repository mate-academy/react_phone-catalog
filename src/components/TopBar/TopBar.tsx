import { Link, NavLink } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { FavouritesContext } from '../../contexts/FavouritesContexr';
import { CartContext } from '../../contexts/CartContext';

type Props = {
  onMenuToggle: () => void;
};

export const TopBar: React.FC<Props> = ({ onMenuToggle }) => {
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);
  const [cartLenght, setCartLenght] = useState(0);

  useEffect(() => {
    const length = cart.reduce(
      (accumulator, currentValue) => currentValue.count + accumulator,
      0,
    );

    setCartLenght(length);
  }, [cart]);

  return (
    <div className="top-bar">
      <div className="top-bar__logo-block">
        <Link to={'/'}>
          <div className="top-bar__logo-img"></div>
        </Link>
      </div>

      <Navigation modifiers="nav--page" itemModifiers="nav__item--aside" />

      <div className="top-bar__block-icons">
        <a
          href="#menu"
          className="top-bar__link-icon top-bar__link-icon--menu"
          onClick={e => {
            e.preventDefault();
            onMenuToggle();
          }}
        >
          <div className="icon icon--menu"></div>
        </a>
        <NavLink
          to="favourites"
          className={({ isActive }) =>
            cn('top-bar__link-icon', 'top-bar__link-icon--fovourites', {
              'top-bar__link-icon--is-active': isActive,
            })
          }
        >
          <div
            className="
             top-bar__icon--fovourites icon icon--fovourites
            "
          ></div>
          {favourites.length > 0 ? (
            <div className="top-bar__counter">{favourites.length}</div>
          ) : (
            ''
          )}
        </NavLink>

        <NavLink
          to="cart"
          className={({ isActive }) =>
            cn('top-bar__link-icon', 'top-bar__link-icon--cart', {
              'top-bar__link-icon--is-active': isActive,
            })
          }
        >
          <div className="top-bar__icon icon icon--cart"></div>
          {cartLenght > 0 ? (
            <div className="top-bar__counter">{cartLenght}</div>
          ) : (
            ''
          )}
        </NavLink>
      </div>
    </div>
  );
};
