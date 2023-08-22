import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__home-link home-link" />

      <div className="header__wrapper">
        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink className="nav__link is-active" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink className="nav__link" to="/phones">
                Phones
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink className="nav__link" to="">
                Tablets
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink className="nav__link" to="">
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <section className="header__header-bar">
          {/* <form
            className="header__search"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              placeholder="Search in phones..."
              className="header__search--bar"
            />
            <button
              type="submit"
              className="header__search--button"
              onClick={() => console.log('hello world')}
            />
          </form> */}
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
