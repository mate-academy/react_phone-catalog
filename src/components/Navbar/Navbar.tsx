import { NavLink } from 'react-router-dom';
import style from './Navbar.module.scss';
import { Toggle } from '../../shared/ui/Toggle';
import { Icons } from '../../shared/ui/Icons/Icons';
import { IconId } from '../../types/icons';
import { useCart } from '../../store/CartContext';
import { useFavourites } from '../../store/FavouritesContext';
import { useCallback, useEffect, useState } from 'react';
import { Aside } from '../Aside';
import { Counter } from '../../shared/ui/Counter';
import { IconMenu } from '../../shared/ui/IconMenu';
import { getNavLinkClass } from '../../utils/helpers/getNavLinkClass';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { cart },
  } = useCart();
  const func = useCart();
  const {
    state: { favourite },
  } = useFavourites();

  const totalItems = func.getTotalItems(cart) || 0;

  const toggleMenu = () => {
    setIsOpen(open => !open);
  };

  useEffect(() => {
    if (isOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={style.navbarMenu}>
          <NavLink className={style.navLogo} to="/">
            <img src="./img/Logo.png" alt="" className={style.logo} />
          </NavLink>

          <ul className={style.navlist}>
            <li className={style.item}>
              <NavLink
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    style.navbarItemActive,
                    style.navbarItem,
                  )
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className={style.item}>
              <NavLink
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    style.navbarItemActive,
                    style.navbarItem,
                  )
                }
                to="/phones"
              >
                Phones
              </NavLink>
            </li>
            <li className={style.item}>
              <NavLink
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    style.navbarItemActive,
                    style.navbarItem,
                  )
                }
                to="/tablets"
              >
                Tablets
              </NavLink>
            </li>
            <li className={style.item}>
              <NavLink
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    style.navbarItemActive,
                    style.navbarItem,
                  )
                }
                to="/accessories"
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={style.rightBlock}>
          <Toggle />

          <ul className={style.buttonsRight}>
            <li className={style.buttonItem}>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    style.buttonBaseActive,
                    style.buttonBase,
                  )
                }
              >
                {favourite.length ? (
                  <>
                    <Icons id={IconId.Heart} />
                    <Counter count={favourite.length} />
                  </>
                ) : (
                  <Icons id={IconId.Heart} />
                )}
              </NavLink>
            </li>
            <li className={style.buttonItem}>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    style.buttonBaseActive,
                    style.buttonBase,
                  )
                }
              >
                {totalItems ? (
                  <>
                    <Icons id={IconId.Cart} />
                    <Counter count={totalItems} />
                  </>
                ) : (
                  <Icons id={IconId.Cart} />
                )}
              </NavLink>
            </li>
          </ul>

          <button className={style.burgerMenu} onClick={toggleMenu}>
            <IconMenu isOpen={isOpen} />
          </button>
        </div>
      </nav>

      <Aside closeMenu={closeMenu} totalItems={totalItems} isOpen={isOpen} />
    </header>
  );
};
