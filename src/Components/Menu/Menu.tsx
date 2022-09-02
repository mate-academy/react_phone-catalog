/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom';
import './Menu.scss';

type Props = {
  location: string;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Menu: React.FC<Props> = ({ location, menuOpen, setMenuOpen }) => {
  return (
    <nav className="Menu">
      <div
        role="button"
        onClick={() => {
          setMenuOpen(false);
        }}
        className={`Menu__backgroundBlur
        ${!menuOpen && 'Menu__backgroundBlur-hidden'}`}
      />
      <ul className={`Menu__ul ${!menuOpen && 'Menu__ul-hidden'}`}>
        <li className="Menu__li">
          <Link
            to="/"
            className="Menu__link"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <h1 className={`Menu__text ${location === '/' && 'borderDark'}`}>
              Home
            </h1>
          </Link>
        </li>
        <li className="Menu__li">
          <Link
            to="/phones"
            className="Menu__link"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <h1 className={`Menu__text ${location === '/phones' && 'borderDark'}`}>Phones</h1>
          </Link>
        </li>
        <li className="NavBar__li">
          <Link
            to="/tablets"
            className="Menu__link"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <h1 className={`Menu__text ${location === '/tablets' && 'borderDark'}`}>
              Tablets
            </h1>
          </Link>
        </li>
        <li className="NavBar__li">
          <Link
            to="/accessories"
            className="Menu__link"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <h1 className={`Menu__text ${location === '/accessories' && 'borderDark'}`}>
              ACCESSORIES
            </h1>
          </Link>
        </li>
        <li className="NavBar__li descktopHiden">
          <Link
            to="/favourites"
            className="Menu__link"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <h1 className="Menu__text">
              FAVOURITES
            </h1>
          </Link>
        </li>
        <li className="NavBar__li descktopHiden">
          <Link
            to="/cart"
            className="Menu__link"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <h1 className="Menu__text">
              CART
            </h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
