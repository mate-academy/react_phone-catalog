import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <>
      <div className={styles.underline}></div>
      <div className={`${styles.container} ${styles.footer}`}>
        <div className={styles.wrapper}>
          <div className={styles.footer_logo}>
            <img src="img/Additional images/icons/Logo.svg" alt="" />
          </div>
          <div className={styles.footer_links}>
            <Link to={'https://github.com/Taipan-4ik/react_phone-catalog'}>
              Github
            </Link>
            <Link to={'/'}>Contacts</Link>
            <Link to={'/'}>rights</Link>
          </div>
          <div className={styles.footer_goTop}>
            <span>Back to top</span>
            <button
              className={styles.footer_button}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                className={styles.footer_logo}
                src={'img/Buttons/Icons/white top.svg'}
                alt="top"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
