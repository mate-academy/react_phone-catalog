import { Link, NavLink } from 'react-router-dom';
import '../styles/menu.scss';
import { getIconMenuClass, getLinkMenuClass } from '../utils/heplerFunctions';
import { useAppSelector } from '../app/hooks';

export const MenuPage = () => {
  const favProductIds = useAppSelector(state => state.favorites.products);
  const cartProductIds = useAppSelector(state => state.cart.products);
  const totalCount = cartProductIds.reduce(
    (count, product) => count + product.count,
    0,
  );

  return (
    <div className="menu">
      <div className="menu__topbar">
        <Link to="/" className="menu__topbar--logo">
          <img src="img/Logo.svg" alt="Logo" />
        </Link>
        <div className="menu__topbar--box topbar-box">
          <Link to={'/'} className="topbar-box__icon">
            <svg className="icon icon-close">
              <use href="img/icons.svg#icon-close"></use>
            </svg>
          </Link>
        </div>
      </div>
      <div className="menu__nav">
        <nav className="menu__nav--list">
          <NavLink to={'/'} className={getLinkMenuClass}>
            Home
          </NavLink>
          <NavLink to={'/phones'} className={getLinkMenuClass}>
            Phones
          </NavLink>
          <NavLink to={'/tablets'} className={getLinkMenuClass}>
            Tablets
          </NavLink>
          <NavLink to={'/accessories'} className={getLinkMenuClass}>
            Accessories
          </NavLink>
        </nav>
      </div>
      <div className="menu__shop">
        <NavLink className={getIconMenuClass} to="/favorites">
          <svg className="icon icon-user">
            <use href="img/icons.svg#icon-favourites"></use>
          </svg>
          {!!favProductIds.length && (
            <span className="icon-count-menu">{favProductIds.length}</span>
          )}
        </NavLink>
        <NavLink className={getIconMenuClass} to="/cart">
          <svg className="icon icon-user">
            <use href="img/icons.svg#icon-shopping-bag"></use>
          </svg>
          {!!totalCount && (
            <span className="icon-count-menu">{totalCount}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
