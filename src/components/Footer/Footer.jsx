import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <div className="footer-logo">
          <NavLink to="/">
            <img
              onClick={scrollToTop}
              src="/images/icons/Logo_1.png"
              alt="logo"
              className="footer-logo-img"
            />
          </NavLink>
        </div>

        <nav className="footer-nav_link">
          <a
            href="https://github.com/vilich-mykhailo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <a
            href="https://t.me/vilich_m"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACTS
          </a>
          <a
            href="https://t.me/vilich_m"
            target="_blank"
            rel="noopener noreferrer"
          >
            RIGHTS
          </a>
        </nav>

        <div className="footer-icons">
          <p onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            Back to top
          </p>
          <button
            onClick={scrollToTop}
            style={{ cursor: 'pointer' }}
            className="swiper-button-custom-footer"
          >
            <img
              src={`/images/icons/Chevron_Arrow_Up.svg`}
              className="icons_arrow"
              alt="Chevron Left"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
