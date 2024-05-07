import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import '../../styles/main.scss';
import { useMemo } from 'react';

export const Footer = () => {

  function isScrollable() {
      const bodyScrollable =
        document.body.scrollHeight > document.body.clientHeight;
      const htmlScrollable =
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight;

      return bodyScrollable || htmlScrollable;
  };

  const hasScroll = useMemo(() => isScrollable(), []);

  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <Link to="/home" className="footer__logo-icon" />
        </div>

        <nav className="footer__nav">
          <NavLink
            to="https://github.com/katya-sn/react_phone-catalog"
            className="footer__nav-link"
          >
            GITHUB
          </NavLink>
          <NavLink to="contacts" className="footer__nav-link">
            CONTACTS
          </NavLink>
          <NavLink to="rights" className="footer__nav-link">
            RIGHTS
          </NavLink>
        </nav>

        <div className="footer__back">
          {hasScroll ? ( <div
            className="footer__back-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="footer__back-button-text">Back to top</div>
            <div className="footer__back-button-icon" />
          </div>) : (<></>)}
        </div>
      </div>
    </div>
  );
};
