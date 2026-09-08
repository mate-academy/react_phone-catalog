import './Footer.scss';
import logo from '../../assets/icons/Logo.svg';
import logo_dark from '../../assets/icons/Logo--dark.svg';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollToTop';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Footer = () => {
  const { theme } = useContext(GlobalContext);

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__body">
          <Link 
            to="/"
            className="footer__logo"
            onClick={() => scrollToTop()}
          >
            <img 
              src={theme === 'dark' ? logo_dark : logo} 
              alt="logo"
            />
          </Link>
          <ul className="footer__menu">
            <li>
              <Link 
                to="https://github.com/NikolayDek"
                className="footer__link"
                target="_blank"
              >
                Github
              </Link>
            </li>
            <li>
              <Link 
                to="https://nikolaydek.github.io/react_phone-catalog/" 
                className="footer__link"
                target="_blank"
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link 
                to="https://nikolaydek.github.io/react_phone-catalog/" 
                className="footer__link"
                target="_blank"
              >
                Rights
              </Link>
            </li>
          </ul>
          <div
            className="footer__block"
            onClick={() => scrollToTop()}
          >
            <span className="footer__btn-title">Back to top</span>
            
            <Button className="button footer__btn" />
          </div>
        </div>
      </div>
    </div>
  );
};
