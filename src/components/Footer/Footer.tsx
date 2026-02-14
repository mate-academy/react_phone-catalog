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

  const getAdress = (item: string) => {
    if (item === 'Github') {
      return 'https://github.com/dmdamyan/react_phone-catalog';
    }

    if (item === 'Contacts') {
      return 'mailto:dmitriignc@gmail.com';
    }

    return 'https://opensource.org/licenses/MIT';
  };

  return pathname !== '/aside' ? (
    <div className={pathname === '/aside' ? 'burger-footer' : 'footer'}>
      <div className="footer__logo">
        <img src={logo} alt="Logo" className="footer__logo__image" />
      </div>

      <div className="footer__info">
        <ul className="footer__info__list">
          {footerMenuList.map(item => (
            <li key={item}>
              <a
                href={getAdress(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__info__item"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__buttons">
        <div
          className="footer__buttons__text"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          Back to top
        </div>

        <div
          className="footer__buttons__slider-button"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          <img
            src={sliderButton}
            className="footer__buttons__slider-button__icon"
          />
        </div>
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
