import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__logo"></div>

        <ul className="footer__contacts">
          <li className="footer__contact">
            <Link to="" className="footer__link">
              Github
            </Link>
          </li>
          <li className="footer__contact">
            <Link to="" className="footer__link">
              Contacts
            </Link>
          </li>
          <li className="footer__contact">
            <Link to="" className="footer__link">
              rights
            </Link>
          </li>
        </ul>

        <div className="footer__back-to-top">
          <span className="footer__text">Back to top</span>
          <button
            className="footer__button"
            onClick={() => window.scrollTo(0, 0)}
          ></button>
        </div>
      </div>
    </div>
  );
};
