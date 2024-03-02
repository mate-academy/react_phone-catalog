import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { goToTop } from '../../api';
import logo from '../../images/logo.svg';
import './Footer.scss';
import { CartContext } from '../CartContext/CartContext';
import { Message } from '../../type/Message';

export const Footer = () => {
  const { setMessage } = useContext(CartContext);

  return (
    <footer>
      <div className="footer__line" />
      <div className="container container--footer">
        <div className="footer">
          <Link to="/" className="logo">
            <img src={logo} alt="LOGO" />
          </Link>
          <nav className="footer__menu">
            <ul className="footer__list">
              <li className="footer__item">
                <Link
                  className="footer__link"
                  to="https://github.com/antonina-klishch"
                >
                  github
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  className="footer__link"
                  to="/"
                  onClick={() => setMessage(Message.NotImplemented)}
                >
                  contacts
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  className="footer__link"
                  to="/"
                  onClick={() => setMessage(Message.NotImplemented)}
                >
                  rights
                </Link>
              </li>
            </ul>
          </nav>

          <div className="footer__back-to-top">
            <label
              className="footer__back-to-top--name"
              htmlFor="back-to-top"
            >
              Back to top
            </label>

            <button
              aria-label="back-to-top"
              id="back-to-top"
              className="footer__back-to-top--button"
              type="button"
              onClick={goToTop}
            >
              <span className="icon icon--up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
