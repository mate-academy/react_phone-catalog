import { Link } from 'react-router-dom';
import './Footer.scss';
import { goTop } from '../../helpers/goTop';

export const Footer = () => {
  return (
    <div className="bottom">
      <div className="bottom__logo">
        <Link to="/">
          <img
            src="img/mine/LOGO.svg"
            alt="Logo"
            className="bottom__logo-img"
          />
        </Link>
      </div>

      <div className="bottom__link">
        <Link
          to="https://github.com/RomanOstrous"
          className="bottom__link-link"
        >
          <p className="bottom__link-git">GitHub</p>
        </Link>

        <Link
          to="https://www.instagram.com/roma_ostrous/"
          className="bottom__link-link"
        >
          <p className="bottom__link-git">Instagram</p>
        </Link>

        <Link
          // eslint-disable-next-line max-len
          to="https://www.facebook.com/profile.php?id=100017306106207&locale=uk_UA"
          className="bottom__link-link"
        >
          <p className="bottom__link-git">Facebook</p>
        </Link>
      </div>

      <div className="bottom__top">
        <button
          className="bottom__top-button"
          type="button"
          onClick={goTop}
        >
          <img src="img/mine/icons/Chevron (Arrow Up).svg" alt="up" />
        </button>
      </div>
    </div>
  );
};
