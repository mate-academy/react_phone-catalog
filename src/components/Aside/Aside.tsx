import { NavLink } from 'react-router-dom';
import './Aside.scss';
import { getBaseUrl } from '../../utils';
import { useCart } from '../../Functional/CartContext/CartContext';

type Props = {
  isMenuOpen: boolean;
  onClose: () => void;
};

export const Aside: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  const { cart, favorites } = useCart();

  return (
    <aside className={`menu ${isMenuOpen ? 'menu--open' : ''}`}>
      <div className="menu__top">
        <NavLink to="/" className="menu__logo" onClick={onClose}>
          <img src={`${getBaseUrl()}icons/logo.svg`} alt="NiceGadgets_logo" />
        </NavLink>
        <div className="menu__close-wrapper">
          <div className="menu__close">
            <button
              type="button"
              className="menu__closes"
              onClick={onClose}
            >
              <img src={`${getBaseUrl()}icons/close.svg`} alt="close" />
            </button>
          </div>
        </div>
      </div>

      <div className="menu__content">
        <nav className="menu__nav">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `nav__link--phone ${isActive ? 'nav__link--active' : ''}`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/phones"
            onClick={onClose}
            className={({ isActive }) =>
              `nav__link--phone ${isActive ? 'nav__link--active' : ''}`
            }
          >
            PHONES
          </NavLink>
          <NavLink
            to="/tablets"
            onClick={onClose}
            className={({ isActive }) =>
              `nav__link--phone ${isActive ? 'nav__link--active' : ''}`
            }
          >
            TABLETS
          </NavLink>
          <NavLink
            to="/accessories"
            onClick={onClose}
            className={({ isActive }) =>
              `nav__link--phone ${isActive ? 'nav__link--active' : ''}`
            }
          >
            ACCESSORIES
          </NavLink>
        </nav>
      </div>

      <div className="menu__bottom">
        <NavLink to="/favorites" className="menu__heart" onClick={onClose}>
          <div className="menu__icon-wrapper">
            <img src={`${getBaseUrl()}icons/heart.svg`} alt="Favorites" />
            {favorites.length > 0 && (
              <span className="menu__count">{favorites.length}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className="menu__packet" onClick={onClose}>
          <div className="menu__icon-wrapper">
            <img src={`${getBaseUrl()}icons/cart.svg`} alt="Cart" />
            {cart.length > 0 && (
              <span className="menu__count">{cart.length}</span>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};