import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Header = () => {
  const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return cn('navigation__link', {
      'navigation__link--active': isActive,
    });
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__menu">
          <Link to="/">
            <img src={'../'} alt="Logo" className="header__logo" />
          </Link>
        </div>
        <nav>
          <ul className="navigation__list">
            <li className="navigation__item">
              <NavLink to="/" className={getLinkClasses}>
                Home
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="phones" className={getLinkClasses}>
                Phones
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="tablets" className={getLinkClasses}>
                Tablets
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="accessories" className={getLinkClasses}>
                Accessories
              </NavLink>
            </li>
          </ul>
          <div className="navigation__icons">
            <div className="navigation__icons__item">
              <NavLink to="favourites" className={getLinkClasses}>
                <img src={'../'} alt="Heart" className="navigation__icon" />
              </NavLink>
            </div>
            <div className="navigation__icons__item">
              <NavLink to="cart" className={getLinkClasses}>
                <img src={'../'} alt="Cart" className="navigation__icon" />
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
