import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import '../../styles/main.scss';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            target="_blank"
          >
            GITHUB
          </NavLink>
          <NavLink to="contacts" className="footer__nav-link" target="_blank">
            CONTACTS
          </NavLink>
          <NavLink to="rights" className="footer__nav-link" target="_blank">
            RIGHTS
          </NavLink>
        </nav>

        {isScrolling ? (
          <div className="footer__back">
            <div
              className="footer__back-button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="footer__back-button-text">Back to top</div>
              <div className="footer__back-button-icon" />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
