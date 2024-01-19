import { NavLink } from 'react-router-dom';

import './MenuNavForPhone.scss';

interface Props {
  transformMobileMenu: number;
  setTransformMobileMenu: React.Dispatch<React.SetStateAction<number>>;
}

export const MenuNavForPhone: React.FC<Props> = ({
  transformMobileMenu,
  setTransformMobileMenu,
}) => {
  const handleCloseMenu = () => {
    setTransformMobileMenu(-100);
    document.body.style.overflow = 'unset';
  };

  return (
    <div
      style={
        {
          transform: `translateX(${transformMobileMenu}%)`,
        }
      }
      className="burger-menu"
    >
      <div className="burger-menu__header">
        <NavLink to="/" className="burger-menu__logo">
          <span className="logo" />
        </NavLink>
        <button
          type="button"
          className="burger-menu__close"
          onClick={handleCloseMenu}
        >
          <span className="icon icon-close" />
        </button>
      </div>
      <div className="burger-menu__nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="phones">Phones</NavLink>
        <NavLink to="tablets">Tablets</NavLink>
        <NavLink to="accessories">Accessories</NavLink>
        <NavLink to="favourites">Favourites</NavLink>
        <NavLink to="cart">Cart</NavLink>
      </div>
    </div>
  );
};
