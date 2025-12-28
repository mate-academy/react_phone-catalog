import './Footer.scss';
import logo from '../../assets/icons/Logo.svg';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__body">
          <Link to="/#" className="footer__logo">
            <img src={logo} alt="logo" />
          </Link>
          <ul className="footer__menu">
            <li>
              <Link 
                to="https://github.com/NikolayDek" 
                className="footer__link"
              >
                Github
              </Link>
            </li>
            <li>
              <Link 
                to="https://nikolaydek.github.io/react_phone-catalog/" 
                className="footer__link"
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link 
                to="https://nikolaydek.github.io/react_phone-catalog/" 
                className="footer__link"
              >
                Rights
              </Link>
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
