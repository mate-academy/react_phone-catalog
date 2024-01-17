import { Link, NavLink } from 'react-router-dom';
import { ICONS } from '../../icons';
import './Footer.scss';

export const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container main-content__container">
        <Link to="/" className="footer__logo">
          <img src={ICONS.logo} alt="logo" />
        </Link>

        <div className="footer__links">
          <NavLink
            to="https://github.com/PavloMykhalov/react_phone-catalog"
            target="_blank"
          >
            Github
          </NavLink>

          <NavLink to="/contacts">Contacts</NavLink>

          <NavLink to="/rights">Rights</NavLink>
        </div>

        <div className="footer__back-to-top">
          <span className="footer__back-to-top--text">Back to top</span>
          <button className="button-top" type="button" onClick={scrollTop}>
            <img src={ICONS.arrowTop} alt="back to top button" />
          </button>
        </div>
      </div>
    </footer>
  );
};
