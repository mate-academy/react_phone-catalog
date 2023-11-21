/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from 'react-use-media-query-ts';
import styles from './Footer.module.scss';

import logo from '../../img/icons/Logo.svg';
import arrowUp from '../../img/icons/ArrowUp.svg';

import { Icon } from '../Icon/Icon';

export const Footer = () => {
  const btnRef = useRef<null | HTMLDivElement>(null);
  const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  const isMobile = useMediaQuery('(max-width: 658px)');

  return (
    <footer className={styles.footer}>
      <Icon path="/" icon={logo} alt="logo" />
      <ul className={`${styles.links} + uppercase`}>
        <li>
          <Link
            to="https://github.com/Ssviatt/react_phone-catalog"
            target="_blank"
          >
            github
          </Link>
        </li>
        <li><Link to="/">contacts</Link></li>
        <li><Link to="/">rights</Link></li>
      </ul>

      {!isMobile ? (
        <div
          className={`${styles.backBtn} + smallText`}
          onClick={scrollToTop}
          ref={btnRef}
        >
          Back to top
          <Icon icon={arrowUp} alt="arrowUp" />
        </div>
      ) : (
        <Icon
          stylesName={styles.backBtn}
          icon={arrowUp}
          alt="arrowUp"
          onClick={scrollToTop}
        />
      )}
    </footer>
  );
};
