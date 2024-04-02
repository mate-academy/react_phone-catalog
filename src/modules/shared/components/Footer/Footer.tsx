import { Logo } from '../Logo/Logo';
import footerStyles from './Footer.module.scss';
import { BackToTop } from './components/BackToTop';
import { FooterNav } from './components/FooterNav/FooterNav';

export const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerContainer}>
        <div className={footerStyles.wrapper}>
          <Logo className={footerStyles.footerLogo} />

          <FooterNav />

          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
