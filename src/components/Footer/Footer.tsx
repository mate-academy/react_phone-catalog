/* eslint-disable max-len */
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import './Footer.scss';
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Link to="/" className="footer__logo">
          <img className="footer__img" src={logo} alt="logo" />
        </Link>

        <ul className="footer__contacts">
          <li className="contacts__item">
            <Link to="/" className="contacts__item">
              Github
            </Link>
          </li>
          <li className="contacts__item">
            <Link to="/" className="contacts__item">
              Contacts
            </Link>
          </li>
          <li className="contacts__item">
            <Link to="/" className="contacts__item">
              rights
            </Link>
          </li>
        </ul>

        <div className="back-to-top__wrapper">
          <span className="back-to-top">Back to top</span>
          <button className="back-to-top__button" onClick={scrollToTop}>
            <svg
              className="back-to-top__button-svg"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.52827 5.47124C0.26792 5.21089 0.26792 4.78878 0.52827 4.52843L4.52827 0.528433C4.78862 0.268083 5.21073 0.268083 5.47108 0.528433L9.47108 4.52843C9.73143 4.78878 9.73143 5.21089 9.47108 5.47124C9.21073 5.73159 8.78862 5.73159 8.52827 5.47124L4.99967 1.94265L1.47108 5.47124C1.21073 5.73159 0.788619 5.73159 0.52827 5.47124Z"
                fill="#B4BDC3"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
