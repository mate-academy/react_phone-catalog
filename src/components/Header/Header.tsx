import './Header.scss';
import { NavBar } from '../NavBar/NavBar';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__navigation">
          <div className="header__logo">
            <Logo />
          </div>

          <NavBar />
        </div>

        <ul className="header__actions">
          <li className="header__item">
            <a
              href="/"
              className="header__link"
            >
              <img
                src="/img/header/Heart.svg"
                alt="Favourites"
                className="header__item-image"
              />
            </a>
          </li>
          <li className="header__item">
            <a
              href="/"
              className="header__link"
            >
              <img
                src="/img/header/ShoppingBag.svg"
                alt="Shopping Bag"
                className="header__item-image"
              />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
