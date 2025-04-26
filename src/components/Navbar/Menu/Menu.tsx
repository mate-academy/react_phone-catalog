import classNames from 'classnames';
import { useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './Menu.scss';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../Context/CartContext';
import { useFavourites } from '../../Context/FavouritesContext';
import { totalQuantity } from '../../../utils/CartUtils';

export const Menu = () => {
  const { i18n, t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { cartList } = useCart();
  const { favouriteList } = useFavourites();
  const cartItems = cartList ? Object.values(cartList) : [];
  const quantity = totalQuantity(cartItems);

  const hasActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link menu__link', {
      'nav__link--active': isActive,
      'nav__link--hover': !isActive,
    });

  const hasActiveLinkIcon = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link__icon', { 'nav__link--active': isActive });

  const currentLanguage = searchParams.get('lang') || 'en';

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  return (
    <div className="menu">
      <div className="nav__links menu__links">
        <NavLink className={hasActiveLink} to={`/?lang=${currentLanguage}`}>
          {t('pageName.0')}
        </NavLink>
        <NavLink
          aria-current="page"
          className={hasActiveLink}
          to={`/phones?lang=${currentLanguage}`}
        >
          {t('pageName.1')}
        </NavLink>
        <NavLink
          aria-current="page"
          className={hasActiveLink}
          to={`/tablets?lang=${currentLanguage}`}
        >
          {t('pageName.2')}
        </NavLink>
        <NavLink
          aria-current="page"
          className={hasActiveLink}
          to={`/accessories?lang=${currentLanguage}`}
        >
          {t('pageName.3')}
        </NavLink>
      </div>
      <div className="menu__icons">
        <NavLink
          className={hasActiveLinkIcon}
          to={`/favourites?lang=${currentLanguage}`}
        >
          <div className="icon__with-number">
            <div className="icon icon--favorites menu__icon"></div>
            {favouriteList && favouriteList.length > 0 && (
              <p className="icon--text">{favouriteList.length}</p>
            )}
          </div>
        </NavLink>
        <div className="menu__border"></div>
        <NavLink
          className={hasActiveLinkIcon}
          to={`/cart?lang=${currentLanguage}`}
        >
          <div className="icon__with-number">
            <div className="icon icon--cart menu__icon"></div>
            {quantity > 0 && <p className="icon--text">{quantity}</p>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
