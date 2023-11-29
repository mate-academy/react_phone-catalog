import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Nav } from '../Nav';
import './Header.scss';
import { useAppSelector } from '../../helpers/app/hooks';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('Header__link', {
    'Header__link--is-active': isActive,
  });
};

export const Header = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  const handleToTopScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="Header">
      <div className="Header__left">
        <Link
          to="/"
          className="Header__logo"
          onClick={handleToTopScroll}
        />
        <Nav />
      </div>

      <div className="Header__right">
        <div className="Header__link-wrapper">
          <NavLink
            to="/favorites"
            className={getLinkClass}
          >
            {!!favorites.length && (
              <p className="Header__count">{favorites.length}</p>
            )}
          </NavLink>
        </div>

        <div className="Header__link-wrapper Header__link-wrapper--cart">
          <NavLink
            to="/cart"
            className={getLinkClass}
          >
            {!!favorites.length && (
              <p className="Header__count">{0}</p>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
