import { NavLink } from 'react-router-dom';
import { Header } from '../components/Header';
import '../styles/menu.scss';
import { getIconMenuClass, getLinkClass } from '../utils/heplerFunctions';
import { useAppSelector } from '../app/hooks';

export const MenuPage = () => {
  const favProductIds = useAppSelector(state => state.favorites.products);
  const cartProductIds = useAppSelector(state => state.cart.products);
  const totalCount = cartProductIds.reduce(
    (count, product) => count + product.count,
    0,
  );

  return (
    <>
      <Header />
      <div className="menu">
        <nav className="menu__list">
          <NavLink to={'/'} className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to={'/phones'} className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to={'/tablets'} className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to={'/accessories'} className={getLinkClass}>
            Accessories
          </NavLink>
        </nav>
        <div className="menu__shop">
          <NavLink className={getIconMenuClass} to="/favorites">
            <svg className="icon icon-user">
              <use href="img/icons.svg#icon-favourites"></use>
            </svg>
            {!!favProductIds.length && (
              <span className="menu__shop--icon icon-count-menu">
                {favProductIds.length}
              </span>
            )}
          </NavLink>
          <NavLink className={getIconMenuClass} to="/cart">
            <svg className="icon icon-user">
              <use href="img/icons.svg#icon-shopping-bag"></use>
            </svg>
            {!!totalCount && (
              <span className="menu__shop--icon icon-count-menu">
                {totalCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};
