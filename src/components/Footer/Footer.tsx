/* eslint-disable import/no-webpack-loader-syntax */
import React, { useContext } from 'react';
import { ReactSVG } from 'react-svg';

import { Logo } from '../Logo';
import { handleScrollToTop } from './ultis';

import './footer.scss';
import { ModalContext } from '../../storage/modalContext';
import {
  NotificationContext,
  NotificationStatus,
} from '../../storage/notificationContext';

export const Footer: React.FC = () => {
  const { setIsOpen } = useContext(ModalContext);
  const { setNotification } = useContext(NotificationContext);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Logo />

          <ul className="footer__links">
            <li className="footer__item">
              <a
                href="/"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__item">
              <a
                href="/"
                className="footer__link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
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
                    message: 'We are sorry, '
                      + 'but this feature is not implemented yet',
                    color: NotificationStatus.Warning,
                  });
                }}
              >
                Rights
              </a>
            </li>
          </ul>

          <div className="footer__back-to-top">
            <label htmlFor="back-to-top" className="footer__back-text">
              Back to top
            </label>

            <button
              type="button"
              className="footer__back-button"
              aria-label="back-to-top"
              id="back-to-top"
              onClick={handleScrollToTop}
            >
              <ReactSVG src="img/icons/ArrowUp.svg" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
