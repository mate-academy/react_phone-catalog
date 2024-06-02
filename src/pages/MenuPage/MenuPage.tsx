import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import './MenuPage.scss';
import { useContext } from 'react';
import { ProductContext } from '../../helper/ProductContext';

export const MenuPage = () => {
  const { card, favorites } = useContext(ProductContext);

  return (
    <div className="menuPage">
      <nav className="menuPage__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames('menuPage__link', { 'is-active': isActive })
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            classNames('menuPage__link', { 'is-active': isActive })
          }
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            classNames('menuPage__link', { 'is-active': isActive })
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            classNames('menuPage__link', { 'is-active': isActive })
          }
        >
          Accessories
        </NavLink>
      </nav>

      <div className="menuPage__favorcart">
        <div className="menuPage__menu-items">
          <Link to="/favorites" className="menuPage__favor favor">
            <img src="img/WhiteHurt.png" alt="favorites" />
            {!!favorites.length && (
              <div className="menuPage__amount-box favor__amount-box">
                <div className="favor__amount">{favorites.length}</div>
              </div>
            )}
          </Link>
          <Link to="/cart" className="menuPage__favor favor">
            <img src="img/ShoppingBag(Cart).png" alt="cart" />
            {!!card.length && (
              <div className="menuPage__amount-box favor__amount-box">
                <div className="favor__amount">{card.length}</div>
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
