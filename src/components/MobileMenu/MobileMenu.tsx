import { Link } from 'react-router-dom';
import './MobileMenu.scss';

export const MobileMenu = () => {
  return (
    <>
      <header className="menu">
        <a href="#">
          <div className="menu__logo"></div>
        </a>
        <a href="#">
          <div className="menu__close"></div>
        </a>
      </header>

      <main className="choice">
        <ul className="choice__list">
          <li className="choice__item">
            <Link to="/" className="choice__href">
              home
            </Link>
          </li>
          <li className="choice__item">
            <Link to="/phones" className="choice__href">
              phones
            </Link>
          </li>
          <li className="choice__item">
            <Link to="/tablets" className="choice__href">
              tablets
            </Link>
          </li>
          <li className="choice__item">
            <Link to="/accessories" className="choice__href">
              accessories
            </Link>
          </li>
        </ul>
      </main>

      <footer className="control">
        <Link to="/favourites" className="control__href">
          <div className="control__like"></div>
        </Link>
        <Link to="/cart" className="control__href">
          <div className="control__backpack"></div>
        </Link>
      </footer>
    </>
  );
};
