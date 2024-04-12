import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import LogoIcon from '../../images/icons/Logo.svg';
import './footer.scss';
import { BackToTopButton } from '../BackToTopButton';
import { FavoritesContext } from '../ContextProviders/ContextProviders';
import { useAppSelector } from '../../app/hooks';

export const Footer = () => {
  const location = useLocation();
  const cartLocation = location.pathname.includes('cart');
  const favoritesLocation = location.pathname.includes('favorites');
  const { favorites } = useContext(FavoritesContext);
  const cart = useAppSelector(state => state.cart);

  const isFooterBottom = () => {
    if ((cartLocation
      && (cart.cartItems.length === 0
        || cart.cartItems.length === 1 || cart.cartItems.length === 2))
      || (favoritesLocation && favorites.length === 0)) {
      return true;
    }

    return false;
  };

  return (
    <div className={classNames(
      'footer',
      { 'footer--empty': isFooterBottom() },
    )}
    >

      <div className="footer__container">
        <div>
          <a href="/" className="logo">
            <img src={LogoIcon} alt="Logo" className="logoImage" />
          </a>
        </div>

        {/* <div className="footer__nav-block"> */}
        <nav className="footer__nav">
          <ul className="footer__nav__bar">
            <li className="footer__nav__item">
              <a href="/" className="footer__nav__link">Github</a>
            </li>
            <li className="footer__nav__item">
              <a href="/" className="footer__nav__link">Contacts</a>
            </li>
            <li className="footer__nav__item">
              <a href="/" className="footer__nav__link">Rights</a>
            </li>
          </ul>
        </nav>
        {/* </div> */}

        <div className="footer__backToTopButton">
          <BackToTopButton />
        </div>
      </div>
    </div>

  );
};
