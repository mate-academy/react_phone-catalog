import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';

import './Footer.scss';

type Props = {
  linkTo: string;
};

const FooterLink: React.FC<Props> = ({ linkTo }) => (
  <Link
    to="https://github.com/kbekher"
    target="_blank"
    className="FooterLink"
  >
    {linkTo}
  </Link>
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

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer__content">
          <div className="Footer__logo">
            <Logo />
          </div>

          <div className="Footer__links">
            <FooterLink linkTo="Github" />
            <FooterLink linkTo="Contacts" />
            <FooterLink linkTo="Rights" />
          </div>

          <div className="Footer__back-to-top back-to-top">
            {hasVerticalScroll && (
              <label
                className="back-to-top__label"
                htmlFor="back-to-top__button"
              >
                <span className="back-to-top__text">
                  Back to top
                </span>
                <button
                  type="button"
                  className="back-to-top__button"
                  onClick={handleClick}
                >
                  {' '}
                </button>
              </label>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
