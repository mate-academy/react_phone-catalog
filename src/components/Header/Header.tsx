import classNames from 'classnames';
import './Header.scss';

import { Link, NavLink } from 'react-router-dom';

// tslint-disable-next-line
import Logo from '../../Images/Icons/logo.svg';

export const Header = () => {
  return (
    <header className="header">
      <h1>Start</h1>
      <div className="header__nav">
        <div className="header__logo">
          <Link
            to="/"
          >
            <img
              src={Logo}
              alt="logo"
            />
          </Link>
        </div>

        <NavLink
          className={classNames('header__nav-link')}
          to="/"
        >
          home
        </NavLink>

      </div>
    </header>
  );
};
