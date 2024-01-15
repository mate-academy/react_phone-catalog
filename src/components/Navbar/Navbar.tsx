import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { SearchBar } from '../SearchBar';

import './style.scss';

export const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__content nav__content--left">
        <Logo />

        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              HOME
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/" className="nav__link">
              PHONES
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/" className="nav__link">
              TABLETS
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/" className="nav__link">
              ACCESSORIES
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav__content">
        <SearchBar className="nav__search-bar" />
        <Link to="/" className="nav__icon-link">
          <span className="icon icon--favourites" />
        </Link>
        <Link to="/" className="nav__icon-link nav__icon-link--last">
          <span className="icon icon--shoppingBag" />
        </Link>
      </div>
    </nav>
  );
};
