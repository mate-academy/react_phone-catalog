import { NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar';
import style from './Header.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '../Burger.menu';
import { Logo } from '../Logo';
import classNames from 'classnames';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { getTotalCartItems } from '../../utils/cart';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const totalItems = getTotalCartItems(cart);

  const handleMenuToggle = () => setIsMenuOpen(prev => !prev);

  const getClass = ({ isActive }: { isActive: boolean }) =>
    classNames(style.icon__link, { [style['is-active']]: isActive });

  return (
    <header className={style.header}>
      <Logo />

      <Navbar />

      <div className={style.icons}>
        <NavLink to="/favorites" className={getClass}>
          <div className={style['img-box']}>
            <img
              className={style.fav__icon}
              src="img/icons/Favourites (Heart Like).svg"
              alt="Favourites"
            />
            {favorites.length > 0 && (
              <p className={style['icon-counter']}>{favorites.length}</p>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getClass}>
          <div className={style['img-box']}>
            <img
              className={style.cart__icon}
              src="img/icons/Shopping bag (Cart).svg"
              alt="Cart"
            />
            {cart.length > 0 && (
              <p className={style['icon-counter']}>{totalItems}</p>
            )}
          </div>
        </NavLink>

        <button className={style.burger__wrapper} onClick={handleMenuToggle}>
          <img
            className="{style.burger__icon"
            src={!isMenuOpen ? 'img/icons/Menu.svg' : 'img/icons/Close.svg'}
            alt={!isMenuOpen ? 'Open Menu' : 'Close Menu'}
          />
        </button>
      </div>

      {isMenuOpen && (
        <BurgerMenu isOpen={isMenuOpen} onClose={handleMenuToggle} />
      )}
    </header>
  );
};
