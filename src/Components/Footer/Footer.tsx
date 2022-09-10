import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollUp = () => setShow(window.scrollY > 0);

    window.addEventListener('scroll', scrollUp);

    return () => {
      window.removeEventListener('scroll', scrollUp);
    };
  }, []);

  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer__content">
          <Logo />

          <div className="Footer__socials">
            <Link to="/" className="link Footer__link">GitHub</Link>
            <Link to="/" className="link Footer__link">Contacts</Link>
            <Link to="/" className="link Footer__link">Rights</Link>
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
              <div className="icon icon--back" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
