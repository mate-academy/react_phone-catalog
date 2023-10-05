import {
  NavLink, useLocation,
} from 'react-router-dom';
import './Header.scss';
import { Logo } from '../Logo/Logo';
import { generateClassNames } from '../../Helpers/functions';
import { useCart } from '../../Helpers/CartContex';
import { useFav } from '../../Helpers/FavContex';
import { Search } from '../Search/Search';

const getClassNames = (
  { isActive }: { isActive: boolean },
) => generateClassNames(
  'header__navbar-item',
  { 'header__navbar-item--active': isActive },
);

const getClassForLink = (
  { isActive }: { isActive: boolean },
) => generateClassNames(
  'header__link',
  { 'header__link--active': isActive },
);

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { quantity } = useFav();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  const isFavPage = location.pathname === '/favourites';
  const isSearchAppears = isFavPage
    || location.pathname === '/phones'
    || location.pathname === '/tablets'
    || location.pathname === '/accessories';

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__left">
          <Logo />

          {!isCartPage && (
            <div className="header__navbar">
              <NavLink to="/" className={getClassNames}>Home</NavLink>
              <NavLink to="/phones" className={getClassNames}>Phones</NavLink>
              <NavLink to="/tablets" className={getClassNames}>Tablets</NavLink>
              <NavLink to="/accessories" className={getClassNames}>
                Accessories
              </NavLink>
            </div>
          )}
        </div>

        <div className="header__icons">
          {isSearchAppears && (
            <Search />
          )}

          {!isCartPage && (
            <NavLink to="/favourites" className={getClassForLink}>
              <img src="images/Favourites.svg" alt="Favourites" />

              {quantity > 0 && (
                <div className="header__item-count header__item-count--fav">
                  <span className="header__count-number">
                    {quantity}
                  </span>
                </div>
              )}
            </NavLink>
          )}

          <NavLink to="/cart" className={getClassForLink}>
            <img src="images/Cart.svg" alt="Cart" />

            {totalItems > 0 && (
              <div className="header__item-count">
                <span className="header__count-number">
                  {totalItems}
                </span>
              </div>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
