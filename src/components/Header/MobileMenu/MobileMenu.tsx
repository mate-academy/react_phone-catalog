import { NavLink } from 'react-router-dom';
import './MobileMenu.scss';

interface Props {
  onClose: () => void;
}

export const MobileMenu: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="mobileMenu">
      <div className="mobileMenu__top">
        <img src="img/Logo.png" alt="logo" className="mobileMenu__logo" />
        <button className="mobileMenu__close" onClick={onClose}>
          ✕
        </button>
      </div>

      <nav className="mobileMenu__nav">
        <NavLink to="/" className="mobileMenu__link" onClick={onClose}>
          Home
        </NavLink>

        <NavLink to="/phones" className="mobileMenu__link" onClick={onClose}>
          Phones
        </NavLink>

        <NavLink to="/tablets" className="mobileMenu__link" onClick={onClose}>
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className="mobileMenu__link"
          onClick={onClose}
        >
          Accessories
        </NavLink>
      </nav>

      <div className="mobileMenu__bottom">
        <NavLink to="/favourites" onClick={onClose}>
          <img src="img/Favourites.png" alt="fav" />
        </NavLink>

        <NavLink to="/cart" onClick={onClose}>
          <img src="img/Shopping_bag.png" alt="cart" />
        </NavLink>
      </div>
    </div>
  );
};
