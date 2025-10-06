import { NavLink } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const ActivateLink = ({ isActive }: { isActive: boolean }) =>
    classNames('header__nav--link', {
      'has-background-white': isActive,
    });

  const IconsActivateLink = ({ isActive }: { isActive: boolean }) =>
    classNames('header__nav--icons--section', {
      'has-underline': isActive,
    });

  return (
    <div className="header">
      <div>
        <img
          className="header__logo"
          src="public/img/ui-kit/header-logo.png"
          alt="header__logo"
        />
      </div>

      <nav className="header__nav">
        <div className="header__nav--links">
          <NavLink className={ActivateLink} to="/">
            home
          </NavLink>
          <NavLink className={ActivateLink} to="/phones">
            phones
          </NavLink>
          <NavLink className={ActivateLink} to="/tablets">
            tablets
          </NavLink>
          <NavLink className={ActivateLink} to="/accessories">
            accessories
          </NavLink>
        </div>

        <div className="header__nav--icons">
          <div className="header__nav--icons--section">
            <NavLink className={IconsActivateLink} to="/favorites">
              <img src="/img/ui-kit/favorites-icon.png" alt="favorites-icon" />
            </NavLink>
          </div>

          <div className="header__nav--icons--section">
            <NavLink className={IconsActivateLink} to="/cart">
              <img src="/img/ui-kit/Shopping-bag.png" alt="Shopping-bag.png" />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
