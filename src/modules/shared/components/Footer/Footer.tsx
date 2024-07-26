import './Footer.scss';
import './../../../shared/styles/Arrow-btn.scss';
import { HashLink as Link } from 'react-router-hash-link';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../utils/GlobalStateProvider';
import { useLocation } from 'react-router-dom';

type Props = {
  appRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const Footer: React.FC<Props> = ({ appRef }) => {
  const location = useLocation();
  const { isDarkThemeOn } = useContext(StateContext);
  const [appHeight, setAppHeight] = useState(0);

  useEffect(() => {
    setAppHeight(appRef.current?.children[2].clientHeight || 0);
  }, [location, window.innerHeight]);

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Link to="/home">
          {isDarkThemeOn ? (
            <img className="footer__logo-icon" src="./img/header/Logo.svg" />
          ) : (
            <img
              className="footer__logo-icon"
              src="./img/header/Logo-dark.svg"
            />
          )}
        </Link>
        <nav className="footer__nav">
          <ul className="footer__items">
            <li
              className={classNames('footer__item', {
                'footer__item--dark': !isDarkThemeOn,
              })}
            >
              <a
                href="https://github.com/BodyaKutsyk"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li
              className={classNames('footer__item', {
                'footer__item--dark': !isDarkThemeOn,
              })}
            >
              <Link to="contacts">Contacts</Link>
            </li>
            <li
              className={classNames('footer__item', {
                'footer__item--dark': !isDarkThemeOn,
              })}
            >
              <Link to="rights">Rights</Link>
            </li>
          </ul>
        </nav>

        <div
          className={classNames('footer__lift', {
            'footer__item--dark': !isDarkThemeOn,
          })}
          style={{
            opacity: appHeight > window.innerHeight ? 1 : 0,
          }}
        >
          <Link className="footer__toTop" to="#welcome">
            Back to top
          </Link>
          <Link to="#welcome">
            <button
              className={classNames('arrow-btn', 'arrow-btn--up', {
                'arrow-btn--dark': !isDarkThemeOn,
              })}
            ></button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
