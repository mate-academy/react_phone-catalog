import './Footer.scss';
import logo from '../../assets/icons/Logo.svg';
import { Button } from '../Button/Button';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__body">
          <a href="#" className="footer__logo">
            <img src={logo} alt="logo" />
          </a>
          <ul className="footer__menu">
            <li>
              <a href="#" className="footer__link">
                Github
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Contacts
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Rights
              </a>
            </li>
          </ul>
          <div
            className="footer__block"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="footer__btn-title">Back to top</span>
            <Button className="button footer__btn" />
          </div>
        </div>
      </div>
    </div>
  );
};
