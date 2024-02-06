import React, { useCallback } from 'react';

import './Footer.scss';
import Logo from '../../UI/Logo';
import ArrowButton from '../../UI/ArrowButton';

export const Footer: React.FC = () => {
  const goToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <footer className='footer'>
      <div className="footer__content">
        <Logo />
        
        <section className="footer__links">
          <a className='footer__link' href="https://github.com/Softjey/react_phone-catalog/tree/develop">
            Github
          </a>

          <a className='footer__link' href="mailto:misivsvatoslav@gmail.com">
            Contacts
          </a>

          <a className='footer__link' href="https://opensource.fb.com/legal/privacy/">
            Rights
          </a>
        </section>

        <ArrowButton wrapperClassName='footer__back-to-top' rotate={90} onClick={goToTop}>
          Back to top
        </ArrowButton>
      </div>
    </footer>
  );
};
