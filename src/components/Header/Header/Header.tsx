import './Header.scss';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ChangeEvent, useContext, useState } from 'react';
import { Logo } from '../../../common/Logo/Logo';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { Product } from '../../../types/types';
import {
  HeaderNavTextButtons,
} from './HeaderNavTextButtons/HeaderNavTextButtons';
import { Button } from '../../../common/Button/Button';

type Props = {
  setVisibleIPhones: any,
  IPhones: Product[],
  setSearchInput: any,
  searchInput: string,
};

export const Header: React.FC<Props> = ({
  setVisibleIPhones,
  IPhones,
  setSearchInput,
  searchInput,
}) => {
  const { pathname } = useLocation();
  const {
    cartProducts, favProducts, setVisibleFavProducts,
  } = useContext<any>(CartAndFavContext);
  const navLinksList = ['home', 'phones', 'tablets', 'accessories'];
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);

  const searchOnPage = (event: ChangeEvent<HTMLInputElement>) => {
    switch (pathname) {
      case '/phones':
        setVisibleIPhones(IPhones.filter((one: Product) => {
          return (
            one.name.toLowerCase().includes(
              event.target.value.toLowerCase(),
            ));
        }));
        break;
      case '/favourites':
        setVisibleFavProducts(favProducts.filter((one: Product) => {
          return (
            one.name.toLowerCase().includes(
              event.target.value.toLowerCase(),
            ));
        }));
        break;
      default:
    }
  };

  return (
    <header className="header">
      <div className="header__block">
        <div className="header__navigation">
          <Logo />
          <HeaderNavTextButtons
            navLinksList={navLinksList}
          />
          <div>
            {/* <NavLink
          // to="/menu"
          > */}
            <div
              className="header__burger"
              onClick={() => {
                setIsBurgerVisible(!isBurgerVisible);
              }}
              aria-hidden
            >

              <div className="">
                <img
                  className="header-button__image"
                  src="icons/menu-burger.svg"
                  alt="burger"
                />

              </div>
              <ul
                className="header__burger-list"
                style={{
                  opacity: isBurgerVisible ? '0' : '1',
                  visibility: isBurgerVisible ? 'visible' : 'hidden',
                  // zIndex: isBurgerVisible ? '1' : '-10',
                  transition: 'opacity .3s',
                }}

              >
                {
                  navLinksList.map((item: string) => {
                    return (
                      <li
                        key={item}
                        className="header__burger-item"
                      >
                        <NavLink
                          to={item}
                          className={({ isActive }) => (
                            isActive ? 'active__burger-link' : 'header__burger-link'
                          )}
                        >
                          {item}
                        </NavLink>
                      </li>
                    );
                  })
                }

              </ul>
            </div>
            {/* </NavLink> */}

            {/* <img
                alt="burger"
                className="header__burger"
                onClick={() => {
                  setIsBurgerVisible(!isBurgerVisible);
                }}
                src="icons/menu-burger.svg"
              /> */}

          </div>
        </div>
        <div className="header__buttons">
          {
            (pathname === '/favourites' || pathname === '/phones'
              || pathname === '/tablets' || pathname === '/accessories') && (
              <label className="products-search" id="hidden">
                <input
                  type="text"
                  placeholder={`Search in ${pathname.slice(1)}...`}
                  className="search-input"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(event.target.value);
                    searchOnPage(event);
                  }}
                />
                <img
                  src="icons/Search.svg"
                  alt="Search"
                  className="small no-border"
                />
              </label>
            )
          }
          <NavLink to="/favourites">
            <div className="header-button">
              <img
                className="header-button__image"
                src="icons/Favourites.svg"
                alt="favourites"
              />
              {
                favProducts.length > 0
                && (
                  <span
                    className="favourite-amount"
                  >
                    {favProducts.length}
                  </span>
                )
              }
            </div>
          </NavLink>
          <NavLink to="/cart">
            <div className="header-button">
              <img
                className="header-button__image"
                src="icons/Cart.svg"
                alt="cart"
              />

              {cartProducts.length > 0
                && <span className="cart-amount">{cartProducts.length}</span>}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
