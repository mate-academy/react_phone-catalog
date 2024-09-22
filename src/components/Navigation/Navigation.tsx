import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { TopAction } from '../TopAction/TopAction';
import { useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { getProductForShow } from '../../pages/CartPage/CartPage';

export const Navigation = () => {
  const { menuStatus, setMenuStatus, favourites, cart } =
    useContext(CatalogContext);

  const getLinkClass = (
    { isActive }: { isActive: boolean },
    additionalClasses?: string,
  ) =>
    classNames('navigation__link', additionalClasses, {
      'is-active': isActive,
    });

  return (
    <nav
      className={classNames('navigation header__navigation', {
        'is-open': menuStatus,
      })}
    >
      <TopAction />
      <div className="navigation__main-menu">
        <NavLink
          to="/"
          className={getLinkClass}
          onClick={() => setMenuStatus(false)}
        >
          home
        </NavLink>

        <NavLink
          to="/phones"
          className={getLinkClass}
          onClick={() => setMenuStatus(false)}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={getLinkClass}
          onClick={() => setMenuStatus(false)}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={getLinkClass}
          onClick={() => setMenuStatus(false)}
        >
          accessories
        </NavLink>
      </div>
      <div className="navigation__addition-menu">
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            getLinkClass({ isActive }, 'favourite__link')
          }
          onClick={() => setMenuStatus(false)}
        >
          {favourites && favourites.length > 0 && (
            <span className="favourites__number">{favourites.length}</span>
          )}
          <img src="/img/icons/Favourites-Heart.svg" alt="favourites-image" />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => getLinkClass({ isActive }, 'cart__link')}
          onClick={() => setMenuStatus(false)}
        >
          {cart && cart.length > 0 && (
            <span className="favourites__number">
              {getProductForShow(cart).length}
            </span>
          )}
          <img src="/img/icons/Shopping-bag.svg" alt="favourites-image" />
        </NavLink>
      </div>
    </nav>
  );
};
