import React from 'react';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

type Props = {};

export const Footer: React.FC<Props> = () => (
  <footer className="footer">
    <Logo className="footer__logo" />
    <ul className="footer__nav">
      <li className="footer__nav-item typography__uppercase">
        <a
          className="footer__nav-link"
          href="https://github.com/siefimov"
          target="blank"
        >
          github
        </a>
      </li>
      <li className="footer__nav-item typography__uppercase">
        <a
          className="footer__nav-link"
          href="https://github.com/siefimov"
          target="blank"
        >
          contacts
        </a>
      </li>
      <li className="footer__nav-item typography__uppercase">
        <a
          className="footer__nav-link"
          href="https://github.com/siefimov"
          target="blank"
        >
          rights
        </a>
      </li>
    </ul>
    <div className="footer__buttons">
      <p className="footer__buttons-text typography__small-text">Back to top</p>
      <button
        className="footer__button"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
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
            d="M3.52851 10.4712C3.26816 10.2109 3.26816 9.78878
              3.52851 9.52843L7.52851 5.52843C7.78886 5.26808
              8.21097 5.26808 8.47132 5.52843L12.4713
              9.52843C12.7317 9.78878 12.7317 10.2109
              12.4713 10.4712C12.211 10.7316 11.7889
              10.7316 11.5285 10.4712L7.99992
              6.94265L4.47132 10.4712C4.21097
              10.7316 3.78886 10.7316 3.52851 10.4712Z"
            fill="#0F0F11"
          />
        </svg>
      </button>
    </div>
  </footer>
);
