import './Footer.scss';
import logo from '../../images/Logo.png';
import sliderButton from '../../images/icons/slider button.png';
import favourites from '../../images/icons/favourites-heart-like.png';
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

  const { footerMenuList } = context;

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
        <img
          src={favourites}
          alt="heart"
          className="burger-footer__favourites__image"
        />
      </Link>

      <Link to={'/cart'} className="burger-footer__shopping-bag">
        <img
          src={shoppingBag}
          alt="shopping bag"
          className="burger-footer__shopping-bag__image"
        />
      </Link>
    </div>
  );
};
