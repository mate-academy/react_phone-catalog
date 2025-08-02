import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { arrow_up, logo_svg } from '../../assets/images';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img
          src={logo_svg}
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
            <img src={arrow_up} alt="2" />
          </button>
        </div>
      </div>
    </footer>
  );
};
