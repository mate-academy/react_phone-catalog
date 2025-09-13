import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src="/img/ui-kit/Header-logo.png" alt="header__logo" />
      </div>

      <div className="footer__nav--links">
        <NavLink className="footer__nav--link" to={'/github'}>
          github
        </NavLink>
        <NavLink className="footer__nav--link" to={'/contacts'}>
          contacts
        </NavLink>
        <NavLink className="footer__nav--link" to={'/rights'}>
          rights
        </NavLink>
      </div>

      <a
        className="back-to-top--link"
        href="#"
        onClick={e => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="footer__nav--icons">
          <p>back to top</p>
          <img
            src="/img/ui-kit/Slider-button-small-top.png"
            alt="favorites-icon"
          />
        </div>
      </a>
    </div>
  );
};
