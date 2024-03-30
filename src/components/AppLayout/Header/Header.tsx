import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { ProductContext } from '../../../context/ProductContext';
import { Search } from './Search';

import style from './Header.module.scss';

export const Header: React.FC = () => {
  const { priceList, favourites } = useContext(ProductContext);
  const [search, setSearch] = useState(false);

  const location = useLocation();
  const { pathname } = location;
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

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(style.navbar__brand__menu__item, {
      [style.isActive]: isActive,
    });

  const getLinkClassRight = ({ isActive }: { isActive: boolean }) =>
    classNames(style.navbar__rightMenu__item, {
      [style.isActive]: isActive,
    });

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
                <span className={style.navbar__rightMenu__item_count}>
                  {favourites.length}
                </span>
              )}
            </NavLink>

            <NavLink to="./cart" className={getLinkClassRight}>
              <FiShoppingBag className={style.navbar__rightMenu__item_icon} />
              {priceList.length !== 0 && (
                <span className={style.navbar__rightMenu__item_count}>
                  {priceList.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};
