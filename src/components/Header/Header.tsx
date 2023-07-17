export const Header = () => {
  return (
    <header className="header">
      <nav className="nav-row">
        <a href="/" className="logo">
          LOGO
        </a>
        <ul className="nav-list">
          <li className="nav-list__item">
            <a
              href="/"
              className="nav-list__link"
            >
              HOME
            </a>
          </li>
          <li className="nav-list__item">
            <a
              href="/"
              className="nav-list__link"
            >
              PHONES
            </a>
          </li>
          <li className="nav-list__item">
            <a
              href="/"
              className="nav-list__link"
            >
              TABLETS
            </a>
          </li>
          <li className="nav-list__item">
            <a
              href="/"
              className="nav-list__link"
            >
              ACCESSORIES
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
