import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <Link to="" className="footer__title">
        <img src={`${import.meta.env.BASE_URL}/img/Logo.svg`} alt="logo" />
      </Link>
      <div className="navbar">
        <NavLink
          to="https://github.com/PavloMolytovnyk/react_phone-catalog"
          className="footer__title"
        >
          Github
        </NavLink>
        <NavLink
          to="mailto:pavelmolitovnik@gmail.com"
          className="footer__title"
        >
          Contacts
        </NavLink>
        <NavLink to="" className="footer__title">
          Rights
        </NavLink>
      </div>
      <div className="buttonUp">
        <a href="#app" className="footer__title">
          Back to top
          <div className="icons iconArrow">
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowUp.svg`}
              alt="arrowUp"
              className="arrow"
            />
          </div>
        </a>
      </div>
    </div>
  );
};
