import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import Logo from '../Logo/Logo';
import Arrow from '../Icons/Arrow/Arrow';
import { ArrowDirection } from '../../types/arrowDirection';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const screenHeight = window.innerHeight;
  const [bodyHeight, setBodyHeight] = useState(document.body.offsetHeight);
  const [isScrolBtn, setIsScrolBtn] = useState(screenHeight !== bodyHeight);
  const location = useLocation();

  useEffect(() => {
    const updateScrollBtn = () => {
      setBodyHeight(document.body.offsetHeight);
      setIsScrolBtn(screenHeight !== document.body.offsetHeight);
    };

    updateScrollBtn();
    window.addEventListener('resize', updateScrollBtn);
    updateScrollBtn();

    return () => {
      window.removeEventListener('resize', updateScrollBtn);
    };
  }, [screenHeight, location]);

  return (
    <footer className={styles.footer}>
      <div className={classNames('container', styles.footer__container)}>
        <Logo className={styles.footer__logo} />
        <nav className={styles.footer_nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/dvdmsk"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/dvdmsk"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/dvdmsk"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
        <button
          className={classNames(styles.footer__upside, {
            [styles.footer__upside_hiden]: !isScrolBtn,
          })}
          disabled={!isScrolBtn}
          onClick={scrollToTop}
        >
          <p>Back to top</p>
          <div>
            <Arrow direction={ArrowDirection.up} />
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
