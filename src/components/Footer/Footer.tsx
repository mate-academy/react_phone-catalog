import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.scss';

export function Footer() {
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const { pathname } = useLocation();

  window.onscroll = () => {
    setIsBtnVisible(true);
  };

  useEffect(() => {
    setIsBtnVisible(false);
  }, [pathname.toString()]);

  return (
    <footer className="page__footer footer">
      <Link to="home" className="footer__logo logo" />

      <div className="footer__links">
        <a
          href="https://github.com/"
          className="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="#/"
          className="footer__link"
        >
          Contacts
        </a>
        <a
          href="#/"
          className="footer__link"
        >
          Rights
        </a>
      </div>

      <div
        className={classNames(
          'footer__button',
          {
            'footer__button--visible': isBtnVisible,
          },
        )}
      >
        <label htmlFor="back-to-top" className="footer__button-label">
          Back to top
        </label>
        <button
          type="button"
          aria-label="back-to-top"
          id="back-to-top"
          onClick={() => window.scroll(0, 0)}
          className="button button--back-to-top"
        />
      </div>
    </footer>
  );
}
