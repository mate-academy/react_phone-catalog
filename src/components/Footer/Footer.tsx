import { useLocation } from 'react-router-dom';
import { BackToTopButton } from '../BackToTopButton';
import { FooterInfo } from '../FooterInfo';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  const location = useLocation();
  const isCartPage = location.pathname.includes('cart');

  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo />

        <FooterInfo />

        {!isCartPage && <BackToTopButton />}
      </div>
    </footer>
  );
};
