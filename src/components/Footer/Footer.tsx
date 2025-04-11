/* eslint-disable */
import React from 'react';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './Footer.module.scss';
import { useTheme } from '../ThemeContext/ThemeContext';
import { Link } from 'react-router-dom';

type Props = {
  disabledIds: number[];
};

export const Footer: React.FC<Props> = ({ disabledIds }) => {
  const { theme } = useTheme();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const handleMailTo = (e: React.MouseEvent) => {
    window.location.href =
      'https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfnbnQwJCpnvccJshzJtZTCtnFDXFjGlJHBBNVjMKBWGqdJmLNblbWgKKVRCJnDFvNfWWg';
    e.preventDefault();
  };

  const hadleRightsClick = (e: React.MouseEvent) => {
    window.location.href =
      'https://docs.github.com/en/get-started/learning-about-github/access-permissions-on-github';
    e.preventDefault();
  };

  return (
    <>
      <footer className={`${styles.footer_main_container}`}>
        <div className={`${styles.footer_logo_container}`}>
          <img
            src={
              theme === 'light'
                ? './img/logo/logo-main.svg'
                : './img/logo/logo-dark-theme.svg'
            }
            alt="logo"
            className={`${styles.footer_logo}`}
          />
        </div>

        <div className={`${styles.footer_text_container}`}>
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <Link
              to={'https://github.com/Artemida1609'}
              className={`${styles.footer_paragraph}`}
            >
              Github
            </Link>
          </div>
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <Link
              to={'#'}
              onClick={handleMailTo}
              className={`${styles.footer_paragraph}`}
            >
              Contacts
            </Link>
          </div>
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <Link
              to={'#'}
              onClick={hadleRightsClick}
              className={`${styles.footer_paragraph}`}
            >
              Rights
            </Link>
          </div>
        </div>

        <div className={`${styles.footer_back_to_top_container}`}>
          <p className={`${styles.footer_back_to_top_text}`}>Back to top</p>
          <Button
            direction={ButtonDirection.up}
            onClick={handleBackToTop}
            buttonId={4}
            disabledIds={disabledIds}
          />
        </div>
      </footer>
    </>
  );
};
