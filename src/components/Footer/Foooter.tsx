import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';
import '../../App.scss';

export const Footer = () => {
  const [hasVerticalScroll, setHasVerticalScroll] = useState(false);
  const { pathname } = useLocation();

  function checkIfPageHasScroll() {
    setHasVerticalScroll(document.body.scrollHeight > window.innerHeight);
  }

  useEffect(() => {
    // check if page has scroll after the first render
    checkIfPageHasScroll();

    // subscribing to resize event to check if scroll appears after resizing
    window.addEventListener('resize', checkIfPageHasScroll);

    return () => {
      window.removeEventListener('resize', checkIfPageHasScroll);
      window.removeEventListener('scroll', checkIfPageHasScroll);
    };
  }, []);

  useEffect(() => {
    setHasVerticalScroll(document.body.scrollHeight > window.innerHeight);
  }, [pathname]);

  // Showing "back to top" button on page scroll is a good insurance
  window.addEventListener('scroll', checkIfPageHasScroll);

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            <Logo />
          </div>
          <div className="footer__links">
            <a href="github.com" className="footer__link">github</a>
            <a href="github.com" className="footer__link">contacts</a>
            <a href="github.com" className="footer__link">rights</a>
          </div>
          <div
            style={hasVerticalScroll ? {} : { visibility: 'hidden' }}
            className="footer__to-top to-top"
          >
            <label className="to-top__label" htmlFor="to-top-button">
              <span className="to-top__text">
                Back to top
              </span>
              <button
                id="to-top-button"
                type="button"
                className="button to-top__button"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                {' '}
              </button>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};
