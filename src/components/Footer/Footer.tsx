import './Footer.scss';

export const Footer = () => (
  <footer className="footer-wrapper">
    <div className="footer">
      <img className="footer__logo" src="logo/logo.svg" alt="logo" />
      <div className="footer__nav">
        <a className="footer__nav-link" href="#">
          Github
        </a>
        <a className="footer__nav-link" href="#">
          Contacts
        </a>
        <a className="footer__nav-link" href="#">
          Rights
        </a>
      </div>
      <div className="footer__back">
        <p className="footer__back-title">Back to top</p>
        <button className="footer__back-button">
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
              // eslint-disable-next-line max-len
              d="M0.528514 5.47124C0.268165 5.21089 0.268165 4.78878 0.528514 4.52843L4.52851 0.528433C4.78886 0.268083 5.21097 0.268083 5.47132 0.528433L9.47132 4.52843C9.73167 4.78878 9.73167 5.21089 9.47132 5.47124C9.21097 5.73159 8.78886 5.73159 8.52851 5.47124L4.99992 1.94265L1.47132 5.47124C1.21097 5.73159 0.788864 5.73159 0.528514 5.47124Z"
              fill="#F1F2F9"
            />
          </svg>
        </button>
      </div>
    </div>
  </footer>
);
