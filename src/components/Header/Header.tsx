export const Header: React.FC = () => (
  <header className="header">
    <nav className="header__navigation nav">
      <a href="home" className="nav__link">
        <img
          src="/static/media/logo.2d8d3e42.svg"
          alt="logo"
          className="nav__logo"
        />
      </a>

      <ul className="nav__list">
        <li className="nav__item nav__item--is-active">
          <a href="aaa" className="nav__link">Home</a>
        </li>
        <li className="nav__item">
          <a href="aaa" className="nav__link">Phones</a>
        </li>
        <li className="nav__item">
          <a href="aaa" className="nav__link">Tablets</a>
        </li>
        <li className="nav__item">
          <a href="aaa" className="nav__link">Accessories</a>
        </li>
      </ul>
    </nav>

    <div className="header__actions">
      <a href="fav" className="header__fav">some fav</a>

      <a href="cart" className="header__cart">some cart</a>
    </div>
  </header>
);
