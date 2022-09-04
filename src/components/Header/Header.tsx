import './Header.scss';
import '../../styles/Nav.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__right">
          <div className="logo">
            <a href="/" className="logo__link">
              <img
                src="/img/header/logo.svg"
                alt="logo"
                className="logo__img"
              />
            </a>
          </div>

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="/" className="nav__link is-active">
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__link">
                  Phones
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__link">
                  Tablets
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__link">
                  Accessories
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__left">
          <a href="/" className="header__icon">
            <img src="/img/header/favorite(Stroke).svg" alt="Favorite" />
          </a>
          <a href="/" className="header__icon">
            <img src="/img/header/withdraw.svg" alt="Withdraw" />
          </a>
        </div>
      </div>
    </header>
  );
};
