import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../images/icons/icons';
import { StateStore } from '../../store/StoreContext';
import './PagesMenu.scss';
import {
  getLinkLogoMenuClass,
  getLinkMenuClass,
} from '../../helpers/getLinkClass';

export const PagesMenu = () => {
  const { products } = useContext(StateStore);

  const favourites = products.filter(item => item.addedToFavourites === true);
  const carts = products.filter(item => item.addedToCart === true);

  return (
    <div className="pageMenu">
      <div className="pageMenu__content">
        <ul className="pageMenu__content__navigation--list">
          <li className="pageMenu__content__navigation--list--item">
            <NavLink
              to="/"
              className={getLinkMenuClass}
            >
              Home
            </NavLink>
          </li>
          <li className="pageMenu__content__navigation--list--item">
            <NavLink
              to="/phones"
              className={getLinkMenuClass}
            >
              Phones
            </NavLink>
          </li>
          <li className="pageMenu__content__navigation--list--item">
            <NavLink
              to="/tablets"
              className={getLinkMenuClass}
            >
              Tablets
            </NavLink>
          </li>
          <li className="pageMenu__content__navigation--list--item">
            <NavLink
              to="/accessories"
              className={getLinkMenuClass}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="pageMenu__bottom">
        <div className="pageMenu__bottom__icon">
          <NavLink
            to="/favourites"
            className={getLinkLogoMenuClass}
          >
            <img
              src={ICONS.favourites}
              alt="Favourites"
              className="pageMenu__bottom__icon--logo"
            />
            {
              !!favourites.length && (
                <div className="pageMenu__bottom__icon__counter">
                  {favourites.length}
                </div>
              )
            }
          </NavLink>
        </div>

        <div className="pageMenu__bottom__icon">
          <NavLink
            to="/cart"
            className={getLinkLogoMenuClass}
          >
            <img
              src={ICONS.cart}
              alt="Cart"
              className="pageMenu__bottom__icon--logo"
            />

            {
              !!carts.length && (
                <div className="pageMenu__bottom__icon__counter">
                  {carts.length}
                </div>
              )
            }
          </NavLink>
        </div>
      </div>
    </div>
  );
};
