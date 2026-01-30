import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Logo } from '../SVGElements/Logo';
import { Icon } from '../Icon';
import { footerLinks } from '@mocks/Data/links';
import { scrollToTop } from '@mocks/Functions/functions';
interface Props {
  additionalClass?: string;
}

export const Footer: React.FC<Props> = ({ additionalClass = '' }) => {
  return (
    <footer
      className={cn('footer', 'container', 'page__footer', additionalClass)}
    >
      <Link to="/home" className="footer__linkOfLogo">
        <Logo width={89} height={32} className="footer__logo" />
      </Link>
      <div className="footer__links">
        {footerLinks.map(link => (
          <a key={link.title} href={link.link} className="footer__link">
            {link.title}
          </a>
        ))}
      </div>
      <div className="footer__backer">
        <label htmlFor="scrollUp" className="footer__smallText">
          Back to top
        </label>
        <button
          onClick={scrollToTop}
          className="button footer__button"
          id="scrollUp"
        >
          <Icon iconSlug="ChevronUp" />
        </button>
      </div>
    </footer>
  );
};
