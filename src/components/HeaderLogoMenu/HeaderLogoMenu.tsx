import { useState } from 'react';
import topBatStyles from './TopBar.module.scss';
import iconStyles from './icon.module.scss';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const HeaderLogoMenu: React.FC<SidebarProps> = ({ setIsMenuOpen, isOpen }) => {
  const iconReference = isOpen ? 'burger-menu' : '';

  const location = useLocation();
  const currentPath = location.pathname;

  console.log(currentPath);
  console.log(isOpen);
  console.log(iconReference);

  return (
    <div className={topBatStyles.header}>
      <div className={topBatStyles['top-bar']}>
        <div className={topBatStyles['top-bar__navigation__wrapper']}>
          <Link
            to="/"
            className={topBatStyles['top-bar__logo']}
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="public\img\gadgets-logo.png"
              alt="img-logo"
              className={topBatStyles['top-bar__logo-img']}
            />
          </Link>

          <ul className={topBatStyles['top-bar__list']}>
            <li className={topBatStyles['top-bar__item']}>
              <Link className={topBatStyles['top-bar__link']} to="/">
                home
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={topBatStyles['top-bar__link']}
                to="/phones?quantity=16&sort=newest"
              >
                Phones
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={topBatStyles['top-bar__link']}
                to="/tablets?quantity=16&sort=newest"
              >
                tablets
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={topBatStyles['top-bar__link']}
                to="/accessories?quantity=16&sort=newest"
              >
                accessories
              </Link>
            </li>
          </ul>
        </div>

        <div className={topBatStyles['top-bar__icon-1']}>
          {isOpen === true ? (
            <button
              // href={`/${iconReference}`}
              className={`${iconStyles.icon} ${iconStyles['icon--close']}`} // ${topBatStyles['top-bar__icon--menu']}
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            ></button>
          ) : (
            <button
              // href={`/${iconReference}`}
              className={`${iconStyles.icon} ${iconStyles['icon--menu']}`} // ${topBatStyles['top-bar__icon--menu']}
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            ></button>
          )}

          <div className={iconStyles['icon--heart__wrapper']}>
            <Link
              to="/favorites"
              className={`${iconStyles['icon--heart']} ${iconStyles.icon}`}
            ></Link>
          </div>

          <div className={iconStyles['icon--bag__wrapper']}>
            <Link
              to="/cart"
              className={`${iconStyles['icon--bag']} ${iconStyles.icon}`}
            ></Link>

            <span className={iconStyles.badge}>12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogoMenu;
