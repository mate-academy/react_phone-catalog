import { Link, NavLink } from 'react-router-dom';
import './Aside.scss';
import '../../styles/button.scss';
import '../../styles/nav.scss';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';

interface Options {
  isActive: boolean;
}

export const Aside = () => {
  const options = ['home', 'phones', 'tablets', 'accessories'];
  const cartProducts = useAppSelector(state => state.cart.items.length);
  const favouriteProducts = useAppSelector(
    state => state.favourite.items.length,
  );

  const getNavLinkPath = (option: string) => {
    return option === 'home' ? '/' : `/${option}`;
  };

  const getLinkClass = ({ isActive }: Options) =>
    cn('nav__item', 'menu__nav__item', {
      'nav__item--is-active': isActive,
    });

  const getLinkIconClass = ({ isActive }: Options) =>
    cn('menu__bottom__button', 'button', {
      'nav__item--is-active': isActive,
    });

  return (
    <aside className="menu" id="menu">
      <div className="menu__top">
        <Link to="/">
          <img src="icons/Logo.svg" alt="Logo" className="menu__logo" />
        </Link>

        <NavLink to="/" className="button menu__close">
          <img src="icons/Menu.svg" alt="menu" />
        </NavLink>
      </div>

      <div className="menu__nav nav">
        {options.map(option => (
          <NavLink
            key={option}
            to={getNavLinkPath(option)}
            className={({ isActive }) => getLinkClass({ isActive })}
          >
            {option}
          </NavLink>
        ))}
      </div>

      <div className="menu__bottom">
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            cn(
              getLinkIconClass({ isActive }),
              'menu__bottom__button--favourites',
            )
          }
        >
          {favouriteProducts > 0 && (
            <div className="menu__bottom__quantity-icon">
              {favouriteProducts}
            </div>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            cn(getLinkIconClass({ isActive }), 'menu__bottom__button--cart')
          }
        >
          {cartProducts > 0 && (
            <div className="menu__bottom__quantity-icon">{cartProducts}</div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
