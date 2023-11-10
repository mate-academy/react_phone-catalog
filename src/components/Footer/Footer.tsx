/* eslint-disable */
import { useContext } from 'react';
import { ReactSVG } from 'react-svg';
import { Logo } from '../Logo';
import './Footer.scss';
import { handleScrollToTop } from './utils';
import { ModalContext } from '../../storage/ModalContext';
import {
  NotificationContext, NotificationStatus,
} from '../../storage/NotificationContext';

export const Footer: React.FC = () => {
  const { setIsModalShow } = useContext(ModalContext);
  const { setNotification } = useContext(NotificationContext);

  return (
    <footer className="footer">
      <Logo />

      <ul className="footer__links">
        <li className="footer__item">
          <a
            href="https://github.com/NataliiaHen/react_phone-catalog"
            className="footer__link"
            target="_blank"
          >
            GitHub
          </a>
        </li>

        <li className="footer__item">
          <a
            href="/"
            className="footer__link"
            onClick={(e) => {
              e.preventDefault();
              setIsModalShow(true);
            }}
          >
            Contacts
          </a>
        </li>

        <li className="footer__item">
          <a
            href="/"
            className="footer__link"
            onClick={(e) => {
              e.preventDefault();
              setNotification({
                message: 'We are sorry, but this feature is not implemented yet',
                color: NotificationStatus.Warning,
              });
            }}
          >
            Rights
          </a>
        </li>
      </ul>

      <div className="footer__back-to-top">
        <label
          htmlFor="back-to-top"
          className="footer__back-label"
        >
          Back to top
        </label>
        <button
          type="button"
          className="footer__back-button"
          aria-label="back-to-top"
          id="back-to-top"
          onClick={handleScrollToTop}
        >
          <ReactSVG
            src="img/icons/Chevron (Arrow Up).svg"
          />
        </button>
      </div>
    </footer>
  );
};
