import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__logo">
          <img src="/img/logo.svg" alt="Logo" />
        </div>
        <ul className="footer__link">
          <li className="footer__link-item">
            <a href="https://github.com/Blervin1" target="_blank">
              Github
            </a>
          </li>
          <li className="footer__link-item">
            <a href="https://github.com/Blervin1" target="_blank">
              Contacts
            </a>
          </li>
          <li className="footer__link-item">
            <a href="https://github.com/Blervin1" target="_blank">
              rights
            </a>
          </li>
        </ul>

        <button
          className="footer__button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
          <svg
            className="footer__arrow"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.52845 10.4712C3.2681 10.2109 3.2681 9.78878 3.52845 9.52843L7.52845 5.52843C7.7888 5.26808 8.21091 5.26808 8.47126 5.52843L12.4713 9.52843C12.7316 9.78878 12.7316 10.2109 12.4713 10.4712C12.2109 10.7316 11.7888 10.7316 11.5285 10.4712L7.99986 6.94265L4.47126 10.4712C4.21091 10.7316 3.7888 10.7316 3.52845 10.4712Z"
              fill="#F1F2F9"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
