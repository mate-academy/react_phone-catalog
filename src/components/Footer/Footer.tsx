import './Footer.scss';
import logo from '../../images/Logo.png';
import sliderButton from '../../images/icons/slider button.png';
import favouritesIcon from '../../images/icons/favourites-heart-like.png';
import shoppingBag from '../../images/icons/group-17.png';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { DevicesContext } from '../../DevicesContext';

export const Footer = () => {
  const { pathname } = useLocation();
  const context = useContext(DevicesContext);

  if (!context) {
    return null;
  }

  const { footerMenuList, cart, favourites } = context;

  return pathname !== '/aside' ? (
    <div className={pathname === '/aside' ? 'burger-footer' : 'footer'}>
      <div className="footer__logo">
        <img src={logo} alt="Logo" className="footer__logo__image" />
      </div>

      <div className="footer__info">
        <ul className="footer__info__list">
          {footerMenuList.map(item => (
            <li className="footer__info__item" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__buttons">
        <a href="#header" className="footer__buttons__text">
          Back to top
        </a>

        <a href="#header" className="footer__buttons__slider-button">
          <img
            src={sliderButton}
            className="footer__buttons__slider-button__icon"
          />
        </a>
      </div>
    </div>
  ) : (
    <div className={pathname === '/aside' ? 'burger-footer' : 'footer'}>
      <Link to={'/favourites'} className="burger-footer__favourites">
        <div className="icon-wrapper">
          <img
            src={favouritesIcon}
            alt="heart"
            className="burger-footer__favourites__image"
          />

          {favourites.length > 0 && (
            <span className="icon-badge">{favourites.length}</span>
          )}
        </div>
      </Link>

      <Link to={'/cart'} className="burger-footer__shopping-bag">
        <div className="icon-wrapper">
          <img
            src={shoppingBag}
            alt="shopping bag"
            className="burger-footer__shopping-bag__image"
          />

          {Object.keys(cart).length > 0 && (
            <span className="icon-badge">{Object.keys(cart).length}</span>
          )}
        </div>
      </Link>
    </div>
  );
};
