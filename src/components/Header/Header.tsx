import { NavLink } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { useCart } from '../../Functional/CartContext/CartContext';

export const Header = () => {
  const { cart } = useCart();
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'is-active': isActive,
    });

  const handlePacketClick = () => {
    alert('Open Cart!');
  };

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo">
          <a href="#" className="header__logo">
            <img src="/figmaLogo/Logo.svg" alt="NiceGadgets_logo" />
          </a>
        </div>

        <div className="header__nav">
          <NavLink to="/" className={getLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </div>

        <div className="header__head--logo">
          <div className="header__heart">
            <a href="#" className="header__heart__top"></a>
          </div>

          <div className="header__packet">
            <button className="header__packet__top" onClick={handlePacketClick}>
              {/* Кількість товарів */}
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
