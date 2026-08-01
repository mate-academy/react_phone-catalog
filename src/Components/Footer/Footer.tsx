import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import { scrollToTop } from '../../utils/functions';

export const Footer = () => {
  return (
    <div className="footer">
      <Link to="" className="footer__title footer__logo">
        <img src={`${import.meta.env.BASE_URL}/img/Logo.svg`} alt="logo" />
      </Link>
      <div className="footer__navbar">
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
        <NavLink
          // eslint-disable-next-line max-len
          to="https://github.com/PavloMolytovnyk/react_phone-catalog/blob/master/LICENSE"
          className="footer__title"
        >
          Rights
        </NavLink>
      </div>
      <div className="buttonUp">
        <div className="buttonUp__link">
          Back to top
          <button
            className="icons iconArrow scroll"
            onClick={() => {
              scrollToTop();
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowUp.svg`}
              alt="arrowUp"
              className="arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
