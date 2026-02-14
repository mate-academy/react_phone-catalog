/* eslint-disable */
import React from 'react';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './Footer.module.scss';
import { useTheme } from '../ThemeContext/ThemeContext';
import { Link } from 'react-router-dom';

const GITHUB_LINK = 'https://github.com/Artemida1609';
const MAIL_LINK =
  'https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfnbnQwJCpnvccJshzJtZTCtnFDXFjGlJHBBNVjMKBWGqdJmLNblbWgKKVRCJnDFvNfWWg';
const RIGHTS_LINK =
  'https://docs.github.com/en/get-started/learning-about-github/access-permissions-on-github';

type Props = {
  disabledIds: number[];
};

const Footer: React.FC<Props> = ({ disabledIds }) => {
  const { theme } = useTheme();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0 });
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
              target="_blank"
              to={GITHUB_LINK}
              className={`${styles.footer_paragraph}`}
            >
              Github
            </Link>
          </div>
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <Link
              target="_blank"
              to={MAIL_LINK}
              className={`${styles.footer_paragraph}`}
            >
              Contacts
            </Link>
          </div>
          <div className={`${styles.footer_paragraph_wrapper}`}>
            <Link
              target="_blank"
              to={RIGHTS_LINK}
              className={`${styles.footer_paragraph}`}
            >
              Rights
            </Link>
          </div>
        </div>

        <div className={`${styles.footer_back_to_top_container}`}>
          <p
            className={`${styles.footer_back_to_top_text}`}
            onClick={handleBackToTop}
          >
            Back to top
          </p>
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

export default Footer;
