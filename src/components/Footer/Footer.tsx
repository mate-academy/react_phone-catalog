import { Logo } from '../Logo';
import { FooterNav } from '../FooterNav';
import { ToTopButton } from '../ToTopButton';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo />

        <FooterNav />

        <ToTopButton />
      </div>
    </footer>
  );
};
