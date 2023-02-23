import './Header.scss';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { Logo } from '../../../common/Logo/Logo';
import { Product } from '../../../types/types';
import {
  HeaderNavTextButtons,
} from './HeaderNavTextButtons/HeaderNavTextButtons';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { SortAndPagesContext } from '../../../context/sortAndPagesContext';

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
  const {
    itemsOnPage,
    currentPage,
    setCurrentPage,
    sortingByValue,
  } = useContext<any>(SortAndPagesContext);
  const navLinksList = ['home', 'phones', 'tablets', 'accessories'];
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const firstIndex = currentPage * itemsOnPage - itemsOnPage;
  const lastIndex = currentPage * itemsOnPage;

  const setProductsAccordingToPages = (
    setProducts: (value: any) => void,
    products: any[],
  ) => {
    setProducts(products.filter((
      _product: any, index: number,
    ) => {
      if (firstIndex > products.length) {
        setCurrentPage(Math.ceil(products.length / itemsOnPage));

        return index > products.length - itemsOnPage;
      }

      return index > firstIndex && index <= lastIndex;
    }));
  };

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

    if (event.target.value.length === 0) {
      if (pathname === '/phones') {
        setProductsAccordingToPages(setVisibleIPhones, IPhones);
      }
    }
  };

  useEffect(() => {
    setSearchInput('');
    if (pathname === '/favourites') {
      setVisibleFavProducts(favProducts.map((one: any) => one));
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
            navLinksList={navLinksList}
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
                  navLinksList.map((item: string) => {
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
