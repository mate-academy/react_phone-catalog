/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';

interface NavLinkIsActive {
  isActive: boolean;
}

interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const navLinkClassName = ({ isActive }: NavLinkIsActive) => {
  return (
    classnames('nav__link', { 'is-active': isActive })
  );
};

const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  return (
    <header className="header">
      <Link to="/" className="header__home-link home-link" />

      <div className="header__wrapper">
        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/phones"
              >
                Phones
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/tablets"
              >
                Tablets
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/accessories"
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <section className="header__header-bar">
          <form
            className="header__search"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              placeholder="Search in phones..."
              className="header__search--bar"
              onChange={event => setSearchQuery(event.target.value)}
            />
            <button
              type="submit"
              className="header__search--button"
              // onClick={() => console.log('hello world')}
            />
          </form>
          <NavLink
            to="/favorites"
            className="header__favorites shopping-icon"
          />
          <NavLink
            to="/shopping-cart"
            className="header__shopping-cart shopping-icon"
          />
        </section>
      </div>
    </header>
  );
};

export default Header;
