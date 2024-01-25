import { Link } from 'react-router-dom';

import './styles.scss';

import { Navbar } from '../navbar/Navbar';
import { Button } from '../button/Button';
import { Logo } from '../logo/Logo';
import { ButtonViews, IconNames } from '../../enums';
import { footerLinks } from '../navbar/libs/enums/footer-links.enum';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo className="footer__logo" />

        <div className="footer__navbar">
          <Navbar links={footerLinks} />
        </div>

        <div className="footer__back-to-top">
          <Link
            to={{}}
            onClick={handleScrollToTop}
            className="footer__back-to-top-link"
          >
            Back to top
          </Link>

          <Button
            className="footer__back-to-top-btn"
            icon={IconNames.ARROW}
            iconOptions={{ rotate: -90 }}
            view={ButtonViews.ICON_BORDER}
            onClick={handleScrollToTop}
          />
        </div>
      </div>
    </footer>
  );
};
