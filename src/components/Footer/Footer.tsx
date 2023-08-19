import { FooterButton } from '../FooterButton';
import { FooterLogo } from '../FooterLogo';
import { FooterNav } from '../FooterNav';

export const Footer = () => {
  const { scrollWidth } = document.documentElement;
  const width = window.innerWidth;

  return (
    <footer className="footer">
      <div className="footer__container">
        <FooterLogo />

        <FooterNav />

        {(scrollWidth !== width) && (
          <FooterButton />
        )}
      </div>
    </footer>
  );
};
