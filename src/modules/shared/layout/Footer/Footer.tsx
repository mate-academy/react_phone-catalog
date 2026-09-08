import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { ButtonType } from '../../../../types/ButtonType';
import logo from '../../../../assets/img/Logo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <Link to={'/'} className={styles.footer__logo}>
            <img className={styles['footer__logo-img']} src={logo} alt="Logo" />
          </Link>

          <div className={styles.footer__nav}>
            <Link
              to={'https://github.com/Aweiro'}
              target="_blank"
              className={`uppercase-text ${styles.footer__link}`}
            >
              Github
            </Link>
            <Link
              to={'http://www.linkedin.com/in/arsen-bogak'}
              target="_blank"
              className={`uppercase-text ${styles.footer__link}`}
            >
              Contacts
            </Link>
            <Link
              to={'https://github.com/Aweiro/react-phone-catalog-landing'}
              target="_blank"
              className={`uppercase-text ${styles.footer__link}`}
            >
              Rights
            </Link>
          </div>

          <div className={styles['footer__button-top']}>
            <p className={`small-text ${styles['footer__button-top-text']}`}>
              Back to top
            </p>
            <Button
              icon={ButtonType.Top}
              isRatio={true}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
