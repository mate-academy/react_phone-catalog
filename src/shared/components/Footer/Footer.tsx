import { Logo } from '../Logo';
import { ButtonTop } from './components/ButtonTop';
import { NavFooter } from './components/NavFooter';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo className="footer__logo" />
        <NavFooter />
        <ButtonTop />
      </div>
    </footer>
  );
};
