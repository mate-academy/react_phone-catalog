import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Footer.scss';
import { footerLinks } from '../../helpers/constants';
import { BackToTop } from '../BackToTop';
import { LinkSocial } from '../LinkSocial';
import { Logo } from '../Logo';

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();

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
          {footerLinks.map(([link, title]) => (
            <LinkSocial key={title} link={link} title={title} />
          ))}
        </div>

        <div
          className={classNames('footer__right', {
            'is-visible': !isVisible,
          })}
        >
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
