import { Link } from 'react-router-dom';
import './Aside.scss';

type Props = {
  isMenuOpen: boolean;
  onClose: () => void;
};

export const Aside: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  return (
    <aside className={`menu ${isMenuOpen ? 'menu--open' : ''}`}>
      <div className="menu__top">
        <Link to="/" className="menu__logo">
          <img src="figmaLogo/Logo.svg" alt="NiceGadgets_logo" />
        </Link>
        <div className="menu__close-wrapper">
          <div className="menu__close">
            <button
              type="button"
              className="menu__closes"
              onClick={onClose}
            ></button>
          </div>
        </div>
      </div>

      <div className="menu__content">
        <nav className="menu__nav">
          <Link to="/" onClick={onClose}>
            <div className="nav__link--phone">HOME</div>
          </Link>
          <Link to="/phones" onClick={onClose}>
            <div className="nav__link--phone">PHONES</div>
          </Link>
          <Link to="/tablets" onClick={onClose}>
            <div className="nav__link--phone">TABLETS</div>
          </Link>
          <Link to="/accessories" onClick={onClose}>
            <div className="nav__link--phone">ACCESSORIES</div>
          </Link>
        </nav>
      </div>

      <div className="menu__bottom">
        <div className="menu__heart">
          <Link to="/favorites" onClick={onClose}>
            <div className="menu__heart__top"></div>
          </Link>
        </div>
        <div className="menu__packet">
          <Link to="/cart" onClick={onClose}>
            <div className="menu__packet__top"></div>
          </Link>
        </div>
      </div>
    </aside>
  );
};
