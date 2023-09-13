import '../../styles/components/Footer/Footer.scss';
import logo from '../../images/icons/logo.svg';

import { Button } from '../Button';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="logo" className="footer__logo" />

      <div className="footer__links">
        <a href="aa" className="footer__link">Github</a>

        <a href="aaa" className="footer__link">Contacts</a>

        <a href="aaa" className="footer__link">Rights</a>
      </div>

      <div className="footer__buttons-container">
        <p className="footer__top-caption">Back to top</p>

        <div className="footer__button-container">
          <Button
            content="arrow"
            arrowDirection="upper"
            className="footer__button"
          />
        </div>
      </div>
    </footer>
  );
};
