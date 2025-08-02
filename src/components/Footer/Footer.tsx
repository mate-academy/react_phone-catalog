import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img
          src="/icons/logo.svg"
          alt="Logo"
          width="80"
          height="28"
          className={styles.logo}
        />

        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="https://github.com/alex-marcovych/react_phone-catalog"
              className="uppercase"
            >
              GITHUB
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/" className="uppercase">
              CONTACTS
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/" className="uppercase">
              RIGHTS
            </NavLink>
          </li>
        </ul>

        <div className={styles.action}>
          <p className={styles.info}>Back to top</p>
          <button
            className={styles.button}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                /* eslint-disable-next-line max-len */
                d="M3.52876 10.4714C3.26841 10.211 3.26841 9.7889 3.52876 9.52855L7.52876 5.52856C7.78911 5.26821 8.21122 5.26821 8.47157 5.52856L12.4716 9.52856C12.7319 9.78891 12.7319 10.211 12.4716 10.4714C12.2112 10.7317 11.7891 10.7317 11.5288 10.4714L8.00016 6.94277L4.47157 10.4714C4.21122 10.7317 3.78911 10.7317 3.52876 10.4714Z"
                fill="#B4BDC4"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
