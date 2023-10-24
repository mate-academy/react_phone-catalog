import './Footer.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import {
  DEF_CONTACTS,
  GITHUB_REPO,
  MIN_WIDTH_TABLET,
} from '../../helpers/consts';

export const Footer = () => {
  const [isShownGoToTop, setIsShownGoToTop] = useState<boolean>(true);
  const [isShownGoToTopText, setIsShownGoToTopText] = useState<boolean>(false);

  useEffect(() => {
    const footer = document.querySelector('.footer');
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setIsShownGoToTop(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback);

    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  useEffect(() => {
    const handlerResize = () => {
      const windowWidth = window.innerWidth;

      setIsShownGoToTopText(windowWidth >= MIN_WIDTH_TABLET);
    };

    handlerResize();

    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <a href="/" className="footer__nav-link">
            <img
              src={logo}
              alt="logo-img"
              className="logo-img"
            />
          </a>

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  to={GITHUB_REPO}
                  className="footer__nav-link nav__link"
                >
                  Github
                </Link>
              </li>

              <li className="nav__item">
                <button
                  type="button"
                  className="footer__nav-link nav__link"
                  onClick={() => {}}
                  title={DEF_CONTACTS}
                >
                  Contacts
                </button>
              </li>

              <li className="nav__item">
                <button
                  type="button"
                  className="footer__nav-link nav__link"
                  onClick={() => {}}
                >
                  Rights
                </button>
              </li>
            </ul>
          </nav>

          {isShownGoToTop ? (<div />) : (
            <div className="footer__button-go-top--container">
              {isShownGoToTopText && ('Back to top')}

              <button
                type="button"
                aria-label="scroll to top"
                className="footer__button-go-top"
                onClick={() => window.scrollTo(0, 0)}
              />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
