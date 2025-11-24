import { NavLink } from 'react-router-dom';

import shopping from '@Images/icons/Shopping-bag.svg';
import style from './Navbar.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ShoppingContex } from '../../context/ShoppingContex';
import cn from 'classnames';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems, favoritItems } = useContext(ShoppingContex);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(style.navbar__link, {
      [style['is--active']]: isActive,
    });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  return (
    <>
      <nav
        className={` ${style.navbar}  ${isOpen ? style.navbar__active : ''} `}
      >
        <ul className={style.navbar__list}>
          <li>
            <NavLink
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
                toggleMenu();
              }}
              className={getLinkClass}
              to="/"
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
                toggleMenu();
              }}
              className={getLinkClass}
              to="/phones"
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
                toggleMenu();
              }}
              className={getLinkClass}
              to="/tablets"
            >
              tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                window.scrollTo({
                  top: 0,

                  behavior: 'smooth',
                });
                toggleMenu();
              }}
              className={getLinkClass}
              to="/accessories"
            >
              accessories
            </NavLink>
          </li>
        </ul>

        <div className={`${style.actions}`}>
          <NavLink
            onClick={toggleMenu}
            to={'favorites'}
            className={props =>
              cn(getLinkClass(props), style['navbar__link--action'])
            }
          >
            <img src={shopping} alt="favorits" />
            {!!favoritItems.length && (
              <span className={style.shopping}>{favoritItems.length}</span>
            )}
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to={'cart'}
            className={props =>
              cn(getLinkClass(props), style['navbar__link--action'])
            }
          >
            <img src={shopping} alt="shopping" />
            {!!cartItems.length && (
              <span className={style.shopping}>{cartItems.length}</span>
            )}
          </NavLink>
        </div>
      </nav>

      <button
        onClick={toggleMenu}
        className={`${style.burger} ${isOpen ? style.burger__active : ''}`}
      ></button>
    </>
  );
};

export default Navbar;
