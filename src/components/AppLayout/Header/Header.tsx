import {IoCloseSharp} from 'react-icons/io5';
import {RxHamburgerMenu} from 'react-icons/rx';
import classNames from 'classnames';
import React, {useContext, useEffect, useState} from 'react';
import {FiShoppingBag} from 'react-icons/fi';
import {FaRegHeart} from 'react-icons/fa';
import {Link, NavLink, useLocation} from 'react-router-dom';

import {ProductContext} from '../../../context/ProductContext';
import {Search} from './Search';

import style from './Header.module.scss';

export const Header: React.FC = () => {
  const {priceList, favourites} = useContext(ProductContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const {pathname} = location;
  const category = pathname.slice(1);
  const showSearch = ['phones', 'tablets', 'accessories'].includes(category);

  const getLinkClass = ({isActive}: {isActive: boolean}) =>
    classNames(style.navbar__brand__menu__item, {
      [style.isActive]: isActive,
    });

  const getLinkClassRight = ({isActive}: {isActive: boolean}) =>
    classNames(style.navbar__rightMenu__item, {
      [style.isActive]: isActive,
    });

  const countPriceList = priceList.reduce((acc, e) => acc + e.number, 0);

  useEffect(() => {
    if (!mobileMenu) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenu(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenu]);

  return (
    <>
      <nav className={style.navbar}>
        <div className={style.navbar__container}>
          <div className={style.navbar__brand}>
            <div className={style.navbar__brand__logo}>
              <Link to="/home" aria-label="Phone Catalog home">
                <img src="./img/svg/LOGO.svg" alt="Phone Catalog" />
              </Link>
            </div>
            <div className={style.navbar__brand__menu}>
              <NavLink to="/" className={getLinkClass}>
                home
              </NavLink>
              <NavLink to="phones" className={getLinkClass}>
                Phones
              </NavLink>
              <NavLink to="tablets" className={getLinkClass}>
                tablets
              </NavLink>
              <NavLink to="accessories" className={getLinkClass}>
                accessories
              </NavLink>
            </div>
          </div>
          <div className={style.navbar__rightMenu}>
            {showSearch && (
              <div className={style.navbar__rightMenu__item_search}>
                <Search category={category} />
              </div>
            )}

            <NavLink
              to="./favourites"
              className={getLinkClassRight}
              aria-label={`Favourites, ${favourites.length} items`}
            >
              <FaRegHeart className={style.navbar__rightMenu__item_icon} />
              {favourites.length !== 0 && (
                <div
                  className={classNames({
                    [style.navbar__rightMenu__item_container]:
                      favourites.length,
                  })}
                >
                  <span
                    className={classNames({
                      [style.navbar__rightMenu__item_container_count]:
                        favourites.length,
                    })}
                  >
                    {favourites.length}
                  </span>
                </div>
              )}
            </NavLink>

            <NavLink
              to="./cart"
              className={getLinkClassRight}
              aria-label={`Shopping cart, ${countPriceList} items`}
            >
              <FiShoppingBag className={style.navbar__rightMenu__item_icon} />
              {priceList.length !== 0 && (
                <div
                  className={classNames({
                    [style.navbar__rightMenu__item_container]: priceList.length,
                  })}
                >
                  <span
                    className={classNames({
                      [style.navbar__rightMenu__item_container_count]:
                        priceList.length,
                    })}
                  >
                    {countPriceList}
                  </span>
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      <nav className={style.navbar_mobi}>
        <div className={style.navbar_mobi__top}>
          <Link
            to="/home"
            className={style.navbar_mobi__logo}
            aria-label="Phone Catalog home"
          >
            <img src="./img/svg/LOGO.svg" alt="Phone Catalog" />
          </Link>

          <div>
            {favourites.length !== 0 && (
              <NavLink
                to="./favourites"
                className={style.navbar_mobi__icon}
                onClick={() => setMobileMenu(false)}
                aria-label={`Favourites, ${favourites.length} items`}
              >
                <FaRegHeart className={style.navbar__rightMenu__item_icon} />
                <div
                  className={classNames({
                    [style.navbar_mobi__container]: favourites.length,
                  })}
                >
                  <span
                    className={classNames({
                      [style.navbar_mobi__container_count]: favourites.length,
                    })}
                  >
                    {favourites.length}
                  </span>
                </div>
              </NavLink>
            )}

            {priceList.length !== 0 && (
              <NavLink
                to="./cart"
                className={style.navbar_mobi__icon}
                onClick={() => setMobileMenu(false)}
                aria-label={`Shopping cart, ${countPriceList} items`}
              >
                <FiShoppingBag className={style.navbar__rightMenu__item_icon} />
                <div
                  className={classNames({
                    [style.navbar_mobi__container]: priceList.length,
                  })}
                >
                  <span
                    className={classNames({
                      [style.navbar_mobi__container_count]: priceList.length,
                    })}
                  >
                    {countPriceList}
                  </span>
                </div>
              </NavLink>
            )}
            <button
              type="button"
              className={style.navbar_mobi__button}
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={
                mobileMenu ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={mobileMenu}
              aria-controls="mobile-navigation"
            >
              {mobileMenu ? (
                <IoCloseSharp className={style.navbar_mobi__close_icon} />
              ) : (
                <RxHamburgerMenu className={style.navbar_mobi__menu_icon} />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={style.navbar_mobi__menu}
          hidden={!mobileMenu}
        >
          <NavLink
            to="/"
            className={({isActive}) =>
              classNames(style.navbar_mobi__link, {
                [style.isActive]: isActive,
              })
            }
            onClick={() => setMobileMenu(false)}
          >
            home
          </NavLink>
          <NavLink
            to="phones"
            className={({isActive}) =>
              classNames(style.navbar_mobi__link, {
                [style.isActive]: isActive,
              })
            }
            onClick={() => setMobileMenu(false)}
          >
            Phones
          </NavLink>
          <NavLink
            to="tablets"
            className={({isActive}) =>
              classNames(style.navbar_mobi__link, {
                [style.isActive]: isActive,
              })
            }
            onClick={() => setMobileMenu(false)}
          >
            tablets
          </NavLink>
          <NavLink
            to="accessories"
            className={({isActive}) =>
              classNames(style.navbar_mobi__link, {
                [style.isActive]: isActive,
              })
            }
            onClick={() => setMobileMenu(false)}
          >
            accessories
          </NavLink>
        </div>
      </nav>
    </>
  );
};
