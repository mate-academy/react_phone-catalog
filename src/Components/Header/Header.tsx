import { FC } from 'react';
import classNames from 'classnames';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { Search } from '../Search/Search';

type Props = {
  favoriteProductLength: number,
  storeCard: number,
};

export const Header: FC<Props> = ({
  favoriteProductLength,
  storeCard,
}) => {
  return (
    <header className="header">
      <div className="header__left">
        <Logo />
        <Nav />
      </div>
      <div className="header__right">
        <Routes>
          <Route path="/favorite" element={<Search />} />
          <Route path="/phones" element={<Search />} />
          <Route path="/tablets" element={<Search />} />
          <Route path="/accessories" element={<Search />} />
        </Routes>

        <div className="header__icons">
          <div className="header__icon">
            <NavLink
              to="/favorite"
              className={({ isActive }) => classNames(
                'header__link header__link--heart',
                { 'header__link--active': isActive },
              )}
              replace
            />
            {!!favoriteProductLength && (
              <span className="header__count">
                {favoriteProductLength}
              </span>
            )}
          </div>

          <div className="header__icon">
            <NavLink
              to="/store"
              className={({ isActive }) => classNames(
                'header__link header__link--catalog',
                { 'header__link--active': isActive },
              )}
            />
            {!!storeCard && (
              <span className="header__count">
                {storeCard}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
