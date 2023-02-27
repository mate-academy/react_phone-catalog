import './Header.scss';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
  useContext, useEffect, useState,
} from 'react';
import { Logo } from '../../../common/Logo/Logo';
import { Product } from '../../../types/types';
import {
  HeaderNavTextButtons,
} from './HeaderNavTextButtons/HeaderNavTextButtons';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { SortAndPagesContext } from '../../../context/SortAndPagesContext';

type Props = {
  setVisibleIPhones: (value: Product[]) => void,
  IPhones: Product[],
  setSearchInput: (value: string) => void,
  searchInput: string,
};
const NAV_LINKS_LIST = ['home', 'phones', 'tablets', 'accessories'];

export const Header: React.FC<Props> = ({
  setVisibleIPhones,
  IPhones,
  setSearchInput,
  searchInput,
}) => {
  const { pathname } = useLocation();
  const {
    cartProducts, favProducts, setVisibleFavProducts,
  } = useContext(CartAndFavContext);
  const {
    itemsOnPage,
    currentPage,
    setCurrentPage,
    sortingByValue,
  } = useContext(SortAndPagesContext);
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const firstIndex = currentPage * itemsOnPage - itemsOnPage;
  const lastIndex = currentPage * itemsOnPage;
  const pathsWithSearch = (
    pathname === '/favourites' || pathname === '/phones'
    || pathname === '/tablets' || pathname === '/accessories');

  const setProductsAccordingToPages = (
    setProducts: (value: any) => void,
    products: Product[],
  ) => {
    setProducts(products.filter((
      _product: Product, index: number,
    ) => {
      if (firstIndex > products.length) {
        setCurrentPage(Math.ceil(products.length / itemsOnPage));

        return index > products.length - itemsOnPage;
      }

      return index > firstIndex && index <= lastIndex;
    }));
  };

  const searchOnPage = (value: string) => {
    switch (pathname) {
      case '/phones':
        setVisibleIPhones(IPhones.filter((one: Product) => {
          return (
            one.name.toLowerCase().includes(
              value.toLowerCase(),
            ));
        }));

        break;
      case '/favourites':
        setVisibleFavProducts(favProducts.filter((one: Product) => {
          return (
            one.name.toLowerCase().includes(
              value.toLowerCase(),
            ));
        }));
        break;
      default:
    }

    if (value.length === 0) {
      if (pathname === '/phones') {
        setProductsAccordingToPages(setVisibleIPhones, IPhones);
      }
    }
  };

  useEffect(() => {
    setSearchInput('');
    if (pathname === '/favourites') {
      setVisibleFavProducts(favProducts.map((one: Product) => one));
    }

    if (pathname === '/phones') {
      setProductsAccordingToPages(setVisibleIPhones, IPhones);
    }
  }, [pathname, itemsOnPage, sortingByValue]);

  return (
    <header className="header">
      <div className="header__block">
        <div className="header__navigation">
          <Logo />
          <HeaderNavTextButtons
            navLinksList={NAV_LINKS_LIST}
          />
          <div>
            <div
              className="header__burger header-button"
              onClick={() => {
                setIsBurgerVisible(!isBurgerVisible);
              }}
              aria-hidden
            >
              <img
                className="header-button__image burger__image "
                src="icons/menu-burger.svg"
                alt="burger"
              />

              <ul
                className="header__burger-list"
                style={{
                  opacity: isBurgerVisible ? '1' : '0',
                  visibility: isBurgerVisible ? 'visible' : 'hidden',
                  transition: 'opacity .3s',
                }}

              >
                {
                  NAV_LINKS_LIST.map((item: string) => {
                    return (
                      <li
                        key={item}
                        className="header__burger-item"
                      >
                        <NavLink
                          to={item}
                          className={({ isActive }) => (
                            isActive
                              ? 'active__burger-link' : 'header__burger-link'
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
          </div>
        </div>
        <div className="header__buttons">
          {
            pathsWithSearch && (
              <label className="products-search" id="hidden">
                <input
                  type="text"
                  placeholder={`Search in ${pathname.slice(1)}...`}
                  className="search-input"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(event.target.value);
                  }}
                />
                <div
                  className="search-button"
                >
                  <img
                    src="icons/Search.svg"
                    alt="Search"
                    className="small no-border"
                    onClick={() => {
                      searchOnPage(searchInput);
                    }}
                    aria-hidden
                  />
                </div>
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
                !!favProducts.length && (
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
