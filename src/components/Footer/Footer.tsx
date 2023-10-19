import React, { useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <div className="Footer">
      <div className="Footer__block">
        <NavLink to="/home" className="Footer__logo" />
        <nav className="Footer__nav">
          <a
            href="https://github.com/Oleksii-Blyzniuk/react_phone-catalog"
            className="Footer__link"
          >
            Github
          </a>
          <a
            href="tel:+380008888"
            className="Footer__link"
          >
            Contacts
          </a>
          <a
            // eslint-disable-next-line max-len
            href="https://www.pinsentmasons.com/out-law/guides/intellectual-property-in-websites-ownership-and-protection"
            className="Footer__link"
          >
            Rights
          </a>
        </nav>
        <label htmlFor="toTop" className="Footer__labelToTop">
          <p className="Footer__textToTop">Back to top</p>
          <button
            type="button"
            id="toTop"
            className="Footer__arrowToTop"
            onClick={() => scrollToTop()}
          >
            &#60;
          </button>
        </label>
      </div>
    </div>
  );
};
