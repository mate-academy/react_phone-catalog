/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

const footerListElements = ['Github', 'Contacts', 'Rights'];

export const Footer = () => {
  return (
    <div className="footer">
      <Logo />
      <ul className="footer__list">
        {footerListElements.map(el => (
          <li className="footer__item">
            <Link
              to="/"
              className="footer__link"
            >
              {el.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <div className="footer__back-to-top back-to-top">
        <span className="back-to-top__text">Back to top</span>
        <button type="button" className="back-to-top__button" />
      </div>
    </div>
  );
};
