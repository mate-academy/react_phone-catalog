import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';
import React, {useEffect, useState} from 'react';
import { LuHeart } from 'react-icons/lu';
import { LuShoppingBag } from 'react-icons/lu';
import { LuMenu } from 'react-icons/lu';
import Menu from '../Menu/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import Badge from '@mui/material/Badge';
import { getFavoritesQuantity } from '../../features/favorites';
import { getTotals} from '../../features/cart';



export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-underline': isActive });
const favoriteTotalQuantity = useSelector(
  (state: RootState) => state.favorites.favoriteTotalQuantity
);

  const cartTotalQuantity = useSelector(
  (state: RootState) => state.cart.cartTotalQuantity
);
const dispatch = useDispatch();

const cartItems = useSelector((state: RootState) => state.cart.cartItems);
const favoriteItems = useSelector(
  (state: RootState) => state.favorites.favoriteItems,
);
const[isMenuOpen, setIsMenuOpen] = useState(false);

useEffect(() => {
  dispatch(getTotals());
}, [dispatch, cartItems]);

useEffect(() => {
  dispatch(getFavoritesQuantity());
}, [dispatch, favoriteItems]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__text">
          <div className="logo">
            <NavLink to="/">
              <img src="/img/logo.png" alt="company_logo" />
            </NavLink>
          </div>

          <div className="navbar__link__container">
            {/* <div className="navbar-brand"> */}
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>

            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>

            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>

            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </div>
        </div>
        <div className="navbar__buttons">
          <NavLink to="/favorites" className="navbar__icon__heart">
            <Badge
              badgeContent={favoriteTotalQuantity || 0}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.5rem',
                  width: '16px',
                  height: '16px',
                  minWidth: '16px', // ensures consistency
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <LuHeart size={18} />
            </Badge>
          </NavLink>

          <NavLink to="/cart" className="navbar__icon__basket">
            <Badge
              badgeContent={cartTotalQuantity}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.5rem',
                  width: '16px',
                  height: '16px',
                  minWidth: '16px', // ensures consistency
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <LuShoppingBag size={18} />
            </Badge>
          </NavLink>
        </div>
        <div className="burger-menu">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              setIsMenuOpen(true);
            }}
          >
            <LuMenu />
          </a>
        </div>
      </nav>

      {isMenuOpen && (
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </>
  );
};
