import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      || document.documentElement.scrollTop;

      setShowBackToTop(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__block">

        <div className="footer__aligned-left">
          <Link
            to="/"
            className="footer__logo logo icon"
          />
        </div>

        <div className="footer__aligned-center">
          <Link
            to="https://github.com/atrofymovych/react_phone-catalog"
            className="footer__link footer__link--github bold"
          >
            GITHUB
          </Link>
          <Link
            to="/contacts"
            className="footer__link footer__link--contacts bold"
          >
            CONTACTS
          </Link>
          <Link
            to="/rights"
            className="footer__link footer__link--rights bold"
          >
            RIGHTS
          </Link>
        </div>

        {showBackToTop && (
          <div
            role="button"
            tabIndex={0}
            className="footer__aligned-right medium"
            onClick={scrollToTop}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Space') {
                scrollToTop();
              }
            }}
          >
            Back to top
            <div className="footer__border-arrow">
              <div className="footer__arrow arrow arrow-up" />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
