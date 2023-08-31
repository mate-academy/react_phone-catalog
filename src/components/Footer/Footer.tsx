import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';

const getActiveTitle = ({ isActive }: { isActive: boolean }) => (
  classNames(
    'titles__link titles__link--footer',
    { 'titles__link--is-active-footer': isActive },
  ));

export const Footer = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scroll]);

  return (
    <footer className="footer">
      <div className="main__container">
        <div className="footer__container">
          <div className="page__logo--footer">
            <Link
              to="/"
              className="page__logo--icon"
            />
          </div>

          <div className="titles">
            <ul className="titles__list">
              <li className="titles__item">
                <Link
                  to="https://github.com/"
                  target="_blank"
                  className="titles__link titles__link--footer"
                >
                  github
                </Link>
              </li>

              <li className="titles__item">
                <NavLink
                  to="/contacts"
                  className={getActiveTitle}
                >
                  contacts
                </NavLink>
              </li>
              <li className="titles__item">
                <NavLink
                  to="/rights"
                  className={getActiveTitle}
                >
                  rights
                </NavLink>
              </li>
            </ul>
          </div>

          <ul className="footer__list">
            <li className="footer__item">
              <button
                type="button"
                className="titles__link titles__link--back-to"
                onClick={() => setScroll(!scroll)}
              >
                Back to top
              </button>
            </li>

            <li className="footer__item">
              <button
                type="button"
                aria-label="scroll-up"
                className="arrow arrow--up"
                onClick={() => setScroll(!scroll)}
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
