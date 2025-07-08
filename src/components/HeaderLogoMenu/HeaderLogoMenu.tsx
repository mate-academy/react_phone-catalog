import { useState } from 'react';
import topBatStyles from './TopBar.module.scss';
import iconStyles from './icon.module.scss';
import { Routes, Route, Link } from 'react-router-dom';
import MobilePhones from '../MobilePhones/MobilePhones';

interface SidebarProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  iconClass: string;
  isOpen: boolean;
}

const HeaderLogoMenu: React.FC<SidebarProps> = ({
  setIsMenuOpen,
  iconClass,
  isOpen,
}) => {
  const iconReference = isOpen ? 'burger-menu' : '';

  console.log(isOpen);

  return (
    <div className={topBatStyles.header}>
      <div className={topBatStyles['top-bar']}>
        <div className={topBatStyles['top-bar__navigation__wrapper']}>
          <Link to="/" className={topBatStyles['top-bar__logo']}>
            <img
              src="public\img\gadgets-logo.png"
              alt="img-logo"
              className={topBatStyles['top-bar__logo-img']}
            />
          </Link>

          <ul className={topBatStyles['top-bar__list']}>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={topBatStyles['top-bar__link']}
                to="/"
                onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
              >
                home
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link className={topBatStyles['top-bar__link']} to="/phones">
                Phones
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link className={topBatStyles['top-bar__link']} to="/tablets">
                tablets
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link className={topBatStyles['top-bar__link']} to="/accessories">
                accessories
              </Link>
            </li>
          </ul>
        </div>

        <div className={topBatStyles['top-bar__icon-1']}>
          {isOpen === true ? (
            <Link
              to={`/${iconReference}`}
              className={`${iconStyles.icon} ${iconStyles['icon--close']}`} // ${topBatStyles['top-bar__icon--menu']}
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            ></Link>
          ) : (
            <Link
              to={`/${iconReference}`}
              className={`${iconStyles.icon} ${iconStyles['icon--menu']}`} // ${topBatStyles['top-bar__icon--menu']}
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            ></Link>
          )}

          <div className={iconStyles['icon--heart__wrapper']}>
            <Link
              to="/"
              className={`${iconStyles['icon--heart']} ${iconStyles.icon}`}
            ></Link>
          </div>

          <div className={iconStyles['icon--bag__wrapper']}>
            <Link
              to="/"
              className={`${iconStyles['icon--bag']} ${iconStyles.icon}`}
            ></Link>

            <span className={iconStyles.badge}>12</span>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/phones" element={<MobilePhones />} />
      </Routes>
    </div>
  );
};

export default HeaderLogoMenu;
