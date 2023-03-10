import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const Footer = () => {
  const scrollToTop = () => {
    document.querySelector('.header')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isHidenBtnToTop = useLocation().pathname === '/cart';

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Logo />
          <ul className="footer__list">
            <li className="footer__item">
              <a href="/" className="footer__link">
                github
              </a>
            </li>
            <li className="footer__item">
              <a href="/" className="footer__link">
                contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="/" className="footer__link">
                rights
              </a>
            </li>
          </ul>
          <button
            type="button"
            className={classNames('footer__button', {
              'footer__button--hiden': isHidenBtnToTop,
            })}
            onClick={scrollToTop}
          >
            Back to top
            <span className="footer__inside-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M3.52858 10.4712C3.26823 10.2109 3.26823 9.78878 3.52858 9.52843L7.52858 5.52843C7.78892 5.26808 8.21103 5.26808 8.47138 5.52843L12.4714 9.52843C12.7317 9.78878 12.7317 10.2109 12.4714 10.4712C12.211 10.7316 11.7889 10.7316 11.5286 10.4712L7.99998 6.94265L4.47138 10.4712C4.21103 10.7316 3.78892 10.7316 3.52858 10.4712Z"
                  fill="#313237"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
