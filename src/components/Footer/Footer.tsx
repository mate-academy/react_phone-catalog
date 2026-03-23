import './Footer.scss';
import Logo from '../../../public/img/Logo/Logo.png';
import { useState } from 'react';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleFooter = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <footer className={`footer ${!isOpen ? 'footer--closed' : ''}`}>
      <div className="footer__container">
        {isOpen && (
          <>
            <div className="footer__left">
              <a href="#" className="logo">
                <img src={Logo} alt="Logo" />
              </a>
            </div>

            <div className="footer__center">
              <div className="nav__footer menu__nav">
                <ul className="footer__list">
                  <li className="footer__item">
                    <a href="#github" className="footer__link">
                      GITHUB
                    </a>
                  </li>
                  <li className="footer__item">
                    <a href="#contacts" className="footer__link">
                      CONTACTS
                    </a>
                  </li>
                  <li className="footer__item">
                    <a href="#rights" className="footer__link">
                      RIGHTS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="footer__right">
          <p className="footer__right--text">
            Back to top
          </p>
          <button
            onClick={toggleFooter}
            className={`icon--slider ${!isOpen ? 'icon--rotated' : ''}`}
          ></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
