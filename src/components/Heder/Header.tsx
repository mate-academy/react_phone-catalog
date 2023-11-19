import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__nav">
        <nav className="nav-bar">
          <NavLink to="/" className="logo icon" />
          <ul className="menu__list">
            <li className="menu__item">
              <NavLink
                to="/home"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link action-link' : 'menu__link')}
              >
                Home
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink
                to="/phones"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link action-link' : 'menu__link')}
              >
                Phones
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink
                to="/tablets"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link action-link' : 'menu__link')}
              >
                Tablets
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink
                to="/accessories"
                className={(
                  { isActive },
                ) => (isActive ? 'menu__link action-link' : 'menu__link')}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__actions">
        <div className="actions__block">
          <NavLink to="/favorites" className="favourites__icon icon" />
        </div>
        <div className="actions__block">
          <NavLink to="/cart" className="cart__icon icon" />
        </div>
      </div>
    </header>
  );
};
