import React, { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './MobileNavigation.scss';
import { TopBar } from '../TopBar';
import { icons } from '../../../global-assets/static';
import classNames from 'classnames';
import { ProductListContext } from '../../shared/context/ProductListContext';
import { TranslationContext } from '../../../i18next/shared/TranslationContext';
import { getPath } from '../../shared/servises/getPath';

export const MobileNavigation: React.FC = () => {
  const { isAside, setIsAside } = useContext(ProductListContext);
  const location = useLocation();
  const IconLike = icons.like.valuePath;
  const IconCart = icons.cart.valuePath;

  useEffect(() => {
    setIsAside(false);
  }, [location, setIsAside]);

  const navTitleList = useContext(TranslationContext).navList;
  const navigationList = navTitleList.slice(0, 4);

  return (
    <div
      className={classNames('nav-aside', {
        'nav-aside--active': isAside,
      })}
    >
      <div className="nav-aside__top">
        <TopBar buttonData={icons.close} />
        <nav className="nav-aside__nav">
          <ul className="nav-aside__list">
            {navigationList.map(listItem => (
              <li key={listItem.link}>
                <NavLink
                  to={getPath(listItem.link)}
                  className={({ isActive }) =>
                    classNames('nav-aside__link', {
                      'nav-aside__link--active': isActive,
                    })
                  }
                >
                  {listItem.title.toUpperCase()}
                  <br />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="nav-aside__bottom">
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames('nav-aside__bottom--button', {
              'nav-aside__bottom--button-is-active': isActive,
            })
          }
        >
          <IconLike />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames('nav-aside__bottom--button', {
              'nav-aside__bottom--button-is-active': isActive,
            })
          }
        >
          <IconCart />
        </NavLink>
      </div>
    </div>
  );
};
