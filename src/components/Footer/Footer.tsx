import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';
import '../../App.scss';

const FooterLink:React.FC<{ text: string }> = ({ text }) => (
  <a
    href="https://github.com/Vovahunter"
    rel="noreferrer"
    target="_blank"
    className="footer__link"
  >
    {text}
  </a>
);

export const Footer = () => {
  const [hasVerticalScroll, setHasVerticalScroll] = useState(false);
  const { pathname } = useLocation();

  function checkIfPageHasScroll() {
    setHasVerticalScroll(document.body.scrollHeight > window.innerHeight);
  }

  useEffect(() => {
    checkIfPageHasScroll();

    window.addEventListener('resize', checkIfPageHasScroll);

    return () => {
      window.removeEventListener('resize', checkIfPageHasScroll);
      window.removeEventListener('scroll', checkIfPageHasScroll);
    };
  }, []);

  useEffect(() => {
    setHasVerticalScroll(document.body.scrollHeight > window.innerHeight);
  }, [pathname]);

  window.addEventListener('scroll', checkIfPageHasScroll);

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            <Logo />
          </div>
          <div className="footer__links">
            <FooterLink text="github" />
            <FooterLink text="contacts" />
            <FooterLink text="rights" />
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
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
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
