import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Footer.module.scss';
import { scrollToTop } from '../../utils/functions';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link to="" className={classNames(styles.footerTitle, styles.footerLogo)}>
        <img src={`${import.meta.env.BASE_URL}/img/Logo.svg`} alt="logo" />
      </Link>

      <div className={styles.footerNavbar}>
        <a
          href="https://github.com/PavloMolytovnyk/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerTitle}
        >
          Github
        </a>
        <a
          href="mailto:pavelmolitovnik@gmail.com"
          className={styles.footerTitle}
        >
          Contacts
        </a>
        <a
          // eslint-disable-next-line max-len
          href="https://github.com/PavloMolytovnyk/react_phone-catalog/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerTitle}
        >
          Rights
        </a>
      </div>

      <div className={styles.buttonUp}>
        <div className={styles.buttonUpLink}>
          Back to top
          <button
            className={classNames('icons', 'iconArrow', styles.scrollButton)}
            onClick={() => {
              scrollToTop();
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowUp.svg`}
              alt="arrowUp"
              className="arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
