import React from 'react';
import { Logo } from '../Logo/Logo';

import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <Logo />

        <div className="footer__link-container">
          <a
            href="https://github.com/OleksandrOse"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://github.com/OleksandrOse"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
          <a
            href="https://github.com/OleksandrOse"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </div>

        <button
          type="button"
          className="footer__button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to top
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="
                M0.528514 5.47124C0.268165 5.21089 0.268165 4.78878 0.528514
                4.52843L4.52851 0.528433C4.78886 0.268083 5.21097 0.268083
                5.47132 0.528433L9.47132 4.52843C9.73167 4.78878 9.73167 5.21089
                9.47132 5.47124C9.21097 5.73159 8.78886 5.73159 8.52851
                5.47124L4.99992 1.94265L1.47132 5.47124C1.21097 5.73159
                0.788864 5.73159 0.528514 5.47124Z
              "
              fill="#313237"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};
