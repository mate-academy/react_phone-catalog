import { FC, useEffect, useState } from 'react';
import { Link, useMatch, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import menu from '../../assets/images/icons/menu.svg';
import heart from '../../assets/images/icons/heart.svg';
import cart from '../../assets/images/icons/cart.svg';
import { NavBar } from '../shared/components/NavBar/NavBar';
import { BurgerMenu } from './components/BurgerMenu';
import { useFavouriteContext } from '../../context/FavoritesContext';
import { useCartContext } from '../../context/CartContext';
import { SearchBar } from '../shared/components/SearchBar';
import s from './Header.module.scss';

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { count } = useFavouriteContext();
  const { cartCount } = useCartContext();
  const matchPhones = useMatch('/phones/*');
  const matchTablets = useMatch('/tablets/*');
  const matchAccessories = useMatch('/accessories/*');

  const isSearch = !!matchPhones || !!matchTablets || !!matchAccessories;

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header>
      {isMenuOpen && <BurgerMenu onClose={closeMenu} />}
      <div className={s.headerWrapper}>
        <div className={s.leftPart}>
          <Link to="/">
            <div className={s.logoWrapper}>
              <img src={logo} alt="Logo" />
            </div>
          </Link>
          <div className={`${s.tabletVisible} ${s.menuWrapper}`}>
            <NavBar />
          </div>
        </div>
        <div className={s.rightPart}>
          {isSearch && (
            <div className={`${s.iconWrapper} ${s.searchWrapper}`}>
              <SearchBar />
            </div>
          )}
          <div className={`${s.iconWrapper} ${s.tabletVisible}`}>
            <Link to="/favorites" className={s.linkWrapper}>
              {count > 0 && <span className={s.iconCount}>{count}</span>}
              <img src={heart} alt="Favourite" />
            </Link>
          </div>
          <div className={`${s.iconWrapper} ${s.tabletVisible}`}>
            <Link to="/cart" className={s.linkWrapper}>
              {cartCount > 0 && (
                <span className={s.iconCount}>{cartCount}</span>
              )}
              <img src={cart} alt="Shopping Cart" />
            </Link>
          </div>
          <div
            className={`${s.iconWrapper} ${s.mobileVisible} ${s.openMenu}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <img src={menu} alt="Mobile Menu" />
          </div>
        </div>
      </div>
    </header>
  );
};
