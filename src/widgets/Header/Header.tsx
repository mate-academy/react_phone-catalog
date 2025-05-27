import './Header.scss';

export const Header = () => (
  <header className="header">
    <a href="/" className="header__logo-link">
      <picture>
        <img
          src="/src/store/images/Logo/Logo.svg"
          alt=""
          aria-hidden="true"
          className="header__logo"
        />
      </picture>
    </a>
    <nav className="nav">
      <a className="nav__link" href="/">
        Home
      </a>
      <a className="nav__link" href="/phones">
        Phones
      </a>
      <a className="nav__link" href="/tablets">
        Tablets
      </a>
      <a className="nav__link" href="/accessories">
        Accessories
      </a>
    </nav>
    <div className="header-ui">
      <button className="header-ui__burger-menu">
        <picture>
          <img
            src="/src/store/images/Icons/burger-menu-16px.png"
            alt=""
            aria-hidden="true"
            className="header-ui__burger-menu-image"
          />
        </picture>
      </button>
      <button className="header-ui__fav">
        <picture>
          <img
            src="/src/store/images/Icons/burger-menu-16px.png"
            alt=""
            aria-hidden="true"
            className="header-ui__burger-menu-image"
          />
        </picture>
      </button>
      <button className="header-ui__cart">
        <picture>
          <img
            src="/src/store/images/Icons/burger-menu-16px.png"
            alt=""
            aria-hidden="true"
            className="header-ui__burger-menu-image"
          />
        </picture>
      </button>
    </div>
  </header>
);
