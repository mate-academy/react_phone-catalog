import { Link, NavLink } from 'react-router-dom';
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
        <NavLink
          to="https://github.com/PavloMolytovnyk/react_phone-catalog"
          className={styles.footerTitle}
        >
          Github
        </NavLink>
        <NavLink
          to="mailto:pavelmolitovnik@gmail.com"
          className={styles.footerTitle}
        >
          Contacts
        </NavLink>
        <NavLink
          // eslint-disable-next-line max-len
          to="https://github.com/PavloMolytovnyk/react_phone-catalog/blob/master/LICENSE"
          className={styles.footerTitle}
        >
          Rights
        </NavLink>
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
