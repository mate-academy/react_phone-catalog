import '../../styles/components/Footer/Footer.scss';
import logo from '../../images/icons/logo.svg';

import { Button } from '../Button';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <img src={logo} alt="logo" className="footer__logo" />

      <div className="footer__links">
        <a
          href="https://github.com/Skrudj/react_phone-catalog"
          className="footer__link"
        >
          Github
        </a>

        <a
          href="https://www.linkedin.com/in/serhii-sinilov-66561a1aa/"
          className="footer__link"
        >
          Contacts
        </a>

        <a
          href={'https://github.com/Skrudj/'
           + 'react_phone-catalog/blob/master/LICENSE'}
          className="footer__link"
        >
          Rights
        </a>
      </div>

      <div className="footer__buttons-container">
        <p className="footer__top-caption">Back to top</p>

        <div className="footer__button-container">
          <Button
            content="arrow"
            arrowDirection="upper"
            className="footer__button"
            onClick={scrollToTop}
          />
        </div>
      </div>
    </footer>
  );
};
