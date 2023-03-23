import classNames from 'classnames';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Nav } from './Nav/Nav';
import { Search } from './Search/Search';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Logo />
        <Nav />
      </div>

      <div className="icons">
        <Routes>
          <Route path="/favorite" element={<Search />} />
        </Routes>

        <div className="icons__icon">
          <NavLink
            to="/favorite"
            className={({ isActive }) => classNames(
              'icons__link icons__link_heart',
              { 'icons__link--active': isActive },
            )}
          />
          <span className="icons__count">1</span>
        </div>

        <div className="icons__icon">
          <NavLink
            to="/store"
            className={({ isActive }) => classNames(
              'icons__link icons__link_catalog',
              { 'icons__link--active': isActive },
            )}
          />
          <span className="icons__count">1</span>
        </div>
      </div>
    </header>
  );
};
