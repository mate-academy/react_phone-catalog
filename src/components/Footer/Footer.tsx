import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { footerLinks } from '../../types/footerLinks';
import { ScrollToTop } from '../ScrollToTop';

import './style.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container container--vertical-middle">
        <div className="footer__items">
          <div className="footer__item">
            <Logo />
          </div>
          <div className="footer__item">
            <div className="footer__links">
              {footerLinks.map(({ pathTo, title }) => (
                <Link to={pathTo} className="footer__link" key={title}>
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer__item">
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
};
