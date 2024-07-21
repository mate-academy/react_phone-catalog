import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Close from '../../images/Header/Close.svg';
import favouritesImg from '../../images/Header/Favourites.svg';
import cartImg from '../../images/Header/Shopping.svg';
import { useProduct } from '../../store/Store';
import HeaderLink from '../HeaderLink/HeaderLink';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('mobile__link', {
    active: isActive,
    link: isActive,
  });

const NavMobile: React.FC = () => {
  const { isOpen, setIsOpen, handleClose, cart, favourites } = useProduct();

  return (
    <div
      className="header__mobile mobile"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <div className="mobile__top">
        <Logo />

        <button className="mobile__close" onClick={() => setIsOpen(false)}>
          <img src={Close} alt="Close" className="mobile__close-img" />
        </button>
      </div>

      <nav className="mobile__nav">
        <ul className="mobile__list">
          <li className="mobile__item">
            <NavLink to="/" className={getLinkClass} onClick={handleClose}>
              home
            </NavLink>
          </li>

          <li className="mobile__item">
            <NavLink
              to="/phones"
              className={getLinkClass}
              onClick={handleClose}
            >
              Phones
            </NavLink>
          </li>

          <li className="mobile__item">
            <NavLink
              to="/tablets"
              className={getLinkClass}
              onClick={handleClose}
            >
              tablets
            </NavLink>
          </li>

          <li className="mobile__item">
            <NavLink
              to="/accessories"
              className={getLinkClass}
              onClick={handleClose}
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mobile__footer">
        <ul className="mobile__footer-list">
          <li className="mobile__footer-item" onClick={handleClose}>
            <HeaderLink
              to="/favourites"
              imgSrc={favouritesImg}
              alt="Favourites"
              counter={favourites.length}
            />
          </li>

          <li className="mobile__footer-item" onClick={handleClose}>
            <HeaderLink
              to="/cart"
              imgSrc={cartImg}
              alt="Cart"
              counter={cart.length}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMobile;
