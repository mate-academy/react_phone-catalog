import './Footer.scss';
import { FC, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons.config';
import { GlobalContext } from '../../../context/GlobalContext';
import { FooterLink } from './types/types';

const FOOTER_LINKS: FooterLink[] = [
  {
    href: 'https://github.com/oleksandr-kovalchuk',
    label: 'Github',
    hasRel: true,
  },
  {
    href: 'https://github.com/oleksandr-kovalchuk',
    label: 'Contacts',
    hasRel: true,
  },
  { href: 'https://github.com/oleksandr-kovalchuk', label: 'rights' },
];

export const Footer: FC = () => {
  const { theme } = useContext(GlobalContext);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const logoSrc = theme === 'light' ? 'logo.svg' : 'logo_dark.svg';

  return (
    <div className="footer">
      <div className="footer__container">
        <a href="#" className="footer__logo-container">
          <img src={logoSrc} alt="Nice Gadgets" className="footer__logo" />
        </a>

        <div className="footer__items">
          {FOOTER_LINKS.map(({ href, label, hasRel }) => (
            <Link
              key={label}
              to={href}
              className="footer__link"
              target="_blank"
              {...(hasRel && { rel: 'noopener noreferrer' })}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="footer__block">
          <div className="footer__button-wrapper" onClick={scrollToTop}>
            <button className="footer__button">
              <Icon icon={icons.arrow_left[theme]} />
            </button>
            <span className="footer__button-title">Back to top</span>
          </div>
        </div>
      </div>
    </div>
  );
};
