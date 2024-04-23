// import { useEffect, useState } from 'react';
import React from 'react';
import './Footer.scss';
import { footerLinks } from '../../services/footerLinks';
import { IconType } from '../../types/IconTypes';
import { scrollToTop } from '../../utils/scrollToTOp';
import { Icon } from '../Icon';
import { Logo } from '../Logo';

interface Props {
  hasScroll?: boolean;
}

export const Footer: React.FC<Props> = ({ hasScroll = true }) => {
  // const [hasScroll, setHasScroll] = useState(false);

  // useEffect(() => {
  //   const handleScroll1 = () => {
  //     setHasScroll(window.scrollY !== 0);
  //   };

  //   window.addEventListener('scroll', handleScroll1);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll1);
  //   };
  // }, []);

  return (
    <footer className="footer">
      <div className="footer__content">
        <Logo />

        <nav className="footer__nav">
          <ul className="footer__list">
            {footerLinks.map(({ text, link }) => (
              <li key={link} className="footer__item">
                <a
                  href={link}
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {hasScroll && (
          <button
            className="footer__button"
            id="#scroll-to-top-button"
            type="button"
            onClick={scrollToTop}
          >
            Back to top
            <div className="footer__icon">
              <Icon iconType={IconType.arrowUp} />
            </div>
          </button>
        )}
      </div>
    </footer>
  );
};
