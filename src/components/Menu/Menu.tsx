import './Menu.scss';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

type Props = {
  closeMenu: () => void;
};

export const Menu: React.FC<Props> = ({ closeMenu }) => {
  return (
    <nav className="menu">
      <div className="menu__top">
        <Logo />

        <button
          type="button"
          className="menu__btn--cross"
          onClick={closeMenu}
        >
          <ReactSVG
            src="img/icons/Close.svg"
          />
        </button>
      </div>

      <ul className="menu__list">
        <li className="menu__item">
          <Link
            to="/"
            className="menu__link"
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>

        <li className="menu__item">
          <Link
            to="/phones"
            className="menu__link"
            onClick={closeMenu}
          >
            Phones
          </Link>
        </li>

        <li className="menu__item">
          <Link
            to="/tablets"
            className="menu__link"
            onClick={closeMenu}
          >
            Tablets
          </Link>
        </li>

        <li className="menu__item">
          <Link
            to="/accessories"
            className="menu__link"
            onClick={closeMenu}
          >
            Accessories
          </Link>
        </li>
      </ul>
    </nav>
  );
};
