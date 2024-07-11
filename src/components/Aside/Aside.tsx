import { Link, NavLink } from 'react-router-dom';
import './Aside.scss';
import '../../styles/button.scss';
import '../../styles/nav.scss';
import cn from 'classnames';

interface Options {
  isActive: boolean;
}

export const Aside = () => {
  const options = ['home', 'phones', 'tablets', 'accessories'];

  const getNavLinkPath = (option: string) => {
    return option === 'home' ? '/' : `/${option}`;
  };

  const getLinkClass = ({ isActive }: Options) =>
    cn('nav__item', 'menu__nav__item', {
      'is-active': isActive,
    });

  const getLinkIconClass = ({ isActive }: Options) =>
    cn('menu__bottom__button', 'button', {
      'is-active': isActive,
    });

  return (
    <aside className="menu" id="menu">
      <div className="menu__top">
        <Link to="/">
          <img src="icons/Logo.svg" alt="Logo" className="menu__logo" />
        </Link>

        <NavLink to="/" className="button menu__close">
          <img src="icons/Union.svg" alt="cart" />
        </NavLink>
      </div>

      <div className="menu__nav nav">
        {options.map(option => (
          <NavLink
            key={option}
            to={getNavLinkPath(option)}
            className={getLinkClass}
          >
            {option}
          </NavLink>
        ))}
      </div>

      <div className="menu__bottom">
        <NavLink to="/favourites" className={getLinkIconClass}>
          <img src="icons/Favourites.svg" alt="favourites" />
        </NavLink>

        <NavLink to="/cart" className={getLinkIconClass}>
          <img src="icons/Cart.svg" alt="cart" />
        </NavLink>
      </div>
    </aside>
  );
};
