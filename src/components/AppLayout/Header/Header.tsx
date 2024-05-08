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
  const [search, setSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const {pathname} = location;
  const category = pathname.slice(1);

  useEffect(() => {
    if (category === 'phones') {
      setSearch(true);

      return;
    }

    if (category === 'tablets') {
      setSearch(true);

      return;
    }

    if (category === 'accessories') {
      setSearch(true);

      return;
    }

    setSearch(false);
  }, [category]);

  const getLinkClass = ({isActive}: {isActive: boolean}) =>
    classNames(style.navbar__brand__menu__item, {
      [style.isActive]: isActive,
    });

  const getLinkClassRight = ({isActive}: {isActive: boolean}) =>
    classNames(style.navbar__rightMenu__item, {
      [style.isActive]: isActive,
    });

  const countPriceList = priceList.reduce((acc, e) => acc + e.number, 0);

  return (
    <>
      <nav className={style.navbar}>
        <div className={style.navbar__container}>
          <div className={style.navbar__brand}>
            <div className={style.navbar__brand__logo}>
              <Link to="/home">
                <img src="./img/svg/LOGO.svg" alt="logo" />
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
            {search && (
              <div className={style.navbar__rightMenu__item_search}>
                <Search category={category} />
              </div>
            )}

            <NavLink to="./favourites" className={getLinkClassRight}>
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

            <NavLink to="./cart" className={getLinkClassRight}>
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
          <Link to="/home" className={style.navbar_mobi__logo}>
            <img src="./img/svg/LOGO.svg" alt="logo" />
          </Link>

          <div>
            {favourites.length !== 0 && (
              <NavLink
                to="./favourites"
                className={style.navbar_mobi__icon}
                onClick={() => setMobileMenu(false)}
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
              className={(style.navbar_mobi__close, style.navbar_mobi__button)}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <IoCloseSharp className={style.navbar_mobi__close_icon} />
              ) : (
                <RxHamburgerMenu className={style.navbar_mobi__close_icon} />
              )}
            </button>
          </div>
        </div>

        <div
          className={style.navbar_mobi__menu}
          style={!mobileMenu ? {display: 'none'} : {display: 'block'}}
        >
          <NavLink
            to="/"
            className={style.navbar_mobi__link}
            onClick={() => setMobileMenu(false)}
          >
            home
          </NavLink>
          <NavLink
            to="phones"
            className={style.navbar_mobi__link}
            onClick={() => setMobileMenu(false)}
          >
            Phones
          </NavLink>
          <NavLink
            to="tablets"
            className={style.navbar_mobi__link}
            onClick={() => setMobileMenu(false)}
          >
            tablets
          </NavLink>
          <NavLink
            to="accessories"
            className={style.navbar_mobi__link}
            onClick={() => setMobileMenu(false)}
          >
            accessories
          </NavLink>
        </div>
      </nav>
    </>
  );
};
