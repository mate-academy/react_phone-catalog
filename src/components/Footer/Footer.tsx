import { useEffect, useState } from 'react';
import './Footer.scss';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { footerLinks } from '../../helpers/constants';
import { LinkSocial } from '../LinkSocial';
import { BackToTop } from '../BackToTop';
import { Logo } from '../Logo';

export const Footer = () => {
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(document.body.scrollHeight > window.innerHeight);
  }, [location]);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <Logo />
        </div>

        <div className="footer__center">
          {footerLinks.map(([link, name]) => (
            <LinkSocial
              key={name}
              to={link}
              name={name}
            />
          ))}
        </div>

        <div className={cn('footer__right', {
          'is-visible': !isVisible,
        })}
        >
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
