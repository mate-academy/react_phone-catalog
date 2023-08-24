import { Link } from 'react-router-dom';
import './FootNavigation.scss';
import logo from '../../Icons/logo.svg';
import { moveToTop } from '../../helpers/movingToTop';

export const FootNavigation = () => {
  const navigationItems = [
    'Github',
    'Contacts',
    'Rights',
  ];

  return (
    <div className="footer">
      <div className="footer__content">
        <Link to="/home" className="footer__logo">
          <img src={logo} alt="logo" />
        </Link>

        <div className="footer__navigation">
          {navigationItems.map(label => (
            <a
              key={label}
              href="https://github.com/vpdrabynko"
              target="_blank"
              className="footer__navigation--item footer__navigation--link"
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="footer__action">
          <button
            type="button"
            className="footer__action--text"
            onClick={moveToTop}
          >
            Back to top
          </button>

          <button
            type="button"
            className="footer__navigation--link footer__action--container"
            onClick={moveToTop}
          >
            <div className="footer__action--img" />
          </button>
        </div>
      </div>
    </div>
  );
};
