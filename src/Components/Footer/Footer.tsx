import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer__content">
          <Logo />

          <div className="Footer__socials">
            <Link to="/" className="link">GitHub</Link>
            <Link to="/" className="link">Contacts</Link>
            <Link to="/" className="link">Rights</Link>
          </div>
          <div
            className={classNames(
              'Footer__back',
              { 'Footer__back--hidden': !show },
            )}
          >
            <p className="Footer__text text">
              Back to top
            </p>
            <button type="button" onClick={() => window.scrollTo(0, 0)}>
              <div className="button-small button-small--back" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
