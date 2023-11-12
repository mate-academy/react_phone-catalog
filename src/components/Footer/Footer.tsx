/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom';
import useMediaQuery from 'react-use-media-query-ts';
import styles from './Footer.module.scss';

import logo from '../../img/icons/Logo.svg';
import arrowUp from '../../img/icons/ArrowUp.svg';

import { Icon } from '../Icon/Icon';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo(0, 0);
  const isMobile = useMediaQuery('(max-width: 425px)');

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
