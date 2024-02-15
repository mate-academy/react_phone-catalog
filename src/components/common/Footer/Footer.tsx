import React, { useCallback } from 'react';

import './Footer.scss';
import ArrowButton from '../../UI/buttons/ArrowButton';

export const Footer: React.FC = () => {
  const goToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="footer">
      <div className="footer__content">
        <img
          src="./img/logos/logo.svg"
          alt=""
          width={32}
          height={32}
        />

        <section className="footer__links">
          <a
            className="footer__link"
            href="https://github.com/Softjey/react_phone-catalog/tree/develop"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

          <a
            className="footer__link"
            href="mailto:misivsvatoslav@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>

          <a
            className="footer__link"
            href="https://opensource.fb.com/legal/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </section>

        <ArrowButton wrapperClassName="footer__back-to-top" rotate={90} onClick={goToTop}>
          Back to top
        </ArrowButton>
      </div>
    </footer>
  );
};
