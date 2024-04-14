import './MenuPage.scss';
import { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { ProductState } from '../../store/storeContext';
import {
  getLinkLogoMenuClass,
  getLinkMenuClass,
} from '../../helpers/getLinkClass';
import { ICONS } from '../../images/icons/Icons';

export const MenuPage = () => {
  const { products } = useContext(ProductState);

  const favourites = products.filter(
    product => product.addedToFavourites === true,
  );
  const carts = products.filter(product => product.addedToCart === true);

  return (
    <div className="pageMenu">
      <div className="pageMenu__content">
        <ul className="pageMenu__navigation">
          <li className="pageMenu__navigation--item">
            <NavLink to="/" className={getLinkMenuClass}>
              Home
            </NavLink>
          </li>

          <li className="pageMenu__navigation--item">
            <NavLink to="/phones" className={getLinkMenuClass}>
              Phones
            </NavLink>
          </li>

          <li className="pageMenu__navigation--item">
            <NavLink to="/tablets" className={getLinkMenuClass}>
              Tablets
            </NavLink>
          </li>

          <li className="pageMenu__navigation--item">
            <NavLink to="/accessories" className={getLinkMenuClass}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="pageMenu__bottom">
        <div className="pageMenu__bottom__icon">
          <NavLink to="/favourites" className={getLinkLogoMenuClass}>
            <img src={ICONS.favourite} alt="favourites" />

            {!!favourites.length && (
              <div className="pageMenu__bottom__icon__counter">
                {favourites.length}
              </div>
            )}
          </NavLink>
        </div>

        <div className="pageMenu__bottom__icon">
          <NavLink to="/cart" className={getLinkLogoMenuClass}>
            <img src={ICONS.cart} alt="cart" />

            {!!carts.length && (
              <div className="pageMenu__bottom__icon__counter">
                {carts.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
