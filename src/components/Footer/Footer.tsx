import { useEffect, useState } from 'react';
import './Footer.scss';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Footer = () => {
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  const goTop = () => {
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    setIsVisible(document.body.scrollHeight > window.innerHeight);
  }, [location]);

  return (
    <footer className="footer">
      <div className="footer__left">
        <Link
          to="/"
          className="footer__logo"
        >
          <div className="footer__logo-img" />
        </Link>
      </div>

      <div className="footer__center">
        <Link
          to="https://github.com/Mykola-Hadupiak"
          className="footer__link"
          target="_blank"
        >
          Github
        </Link>

        <Link
          to="https://www.linkedin.com/in/mykola-hadupiak/"
          className="footer__link"
          target="_blank"
        >
          Contacts
        </Link>

        <Link
          to="https://www.linkedin.com/in/mykola-hadupiak/"
          className="footer__link"
          target="_blank"
        >
          Rights
        </Link>
      </div>

      <div className={cn('footer__right', {
        'is-visible': !isVisible,
      })}
      >
        <button className="back-to-top" type="button" onClick={goTop}>

          <p className="back-to-top__message">Back to top</p>

          <div className="back-to-top__button">
            <div className="icon icon-top" />
          </div>
        </button>
      </div>
    </footer>
  );
};
