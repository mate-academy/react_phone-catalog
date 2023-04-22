import './Footer.scss';

import Logo from '../Logo/Logo';
import ButtonMove from './ButtonMove/ButtonMove';
import Nets from './Nets/Nets';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__wrapper">
        <Logo classNames="footer__logo" />
        <Nets />
        <ButtonMove />
      </div>
    </div>
  </footer>
);

export default Footer;
