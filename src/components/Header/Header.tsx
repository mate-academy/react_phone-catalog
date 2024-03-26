import cn from 'classnames';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { NavItem } from '../NavItem';
import './Header.scss';
import { CartContext } from '../../store/CartContext';
import { FavContext } from '../../store/FavContext';
import { Search } from '../Search';
import { NavList } from '../NavList';

const getActionLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'header__action header__action--active' : 'header__action';
};

export const Header = () => {
  const { favQuantity } = useContext(FavContext);
  const { cartQuantity } = useContext(CartContext);

  const [isBurgerVisible, setIsBurgerVisible] = useState(false);

  const burgerHandler = () => {
    setIsBurgerVisible(prev => !prev);
    document.body.classList.toggle('menu-show');
  };

  const closeMenu = () => {
    setIsBurgerVisible(false);
    document.body.classList.remove('menu-show');
  };

  return (
    <header className="header">
      <NavList closeMenu={closeMenu} isBurgerVisible={isBurgerVisible} />
      <Search />
      <div className="header__actions">
        <button
          type="button"
          aria-label="burger menu open button"
          className="header__burger"
          onClick={burgerHandler}
        >
          {isBurgerVisible ? (
            <i className="ico ico-close ico-close-dark" />
          ) : (
            <i className="ico ico-menu ico-menu-dark" />
          )}
        </button>

        <div
          className={cn({
            header__actions_container: !isBurgerVisible,
            'header__actions_container--active': isBurgerVisible,
          })}
        >
          <NavLink
            to="/favorites"
            className={getActionLinkClass}
            onClick={closeMenu}
          >
            <i className="ico ico-fav" />
            {favQuantity > 0 && (
              <p className="header__actions--quantity">{favQuantity}</p>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={getActionLinkClass}
            onClick={closeMenu}
          >
            <i className="ico ico-cart" />
            {cartQuantity > 0 && (
              <p className="header__actions--quantity">{cartQuantity}</p>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
