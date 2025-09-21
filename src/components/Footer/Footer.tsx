import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import logoFooter from '/img/logo/Logo.png';
import arrowUp from '/icons/arrow-up-icon.png';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo_footer}>
        <img src={logoFooter} alt="logo" className={styles.logo_footer_img} />
      </div>

      <div className={styles.footer_navigation}>
        <NavLink
          to={
            'https://github.com/annaabramovaa/react_phone-catalog/tree/develop'
          }
        >
          GitHub
        </NavLink>
        <NavLink to={'/'}>Contacts</NavLink>
        <NavLink to={'/'}>Rights</NavLink>
      </div>
      <div className={styles.footer_backToTop}>
        <p>Back to top</p>
        <button className={styles.footer_btn}>
          <img src={arrowUp} alt="arrowUp" />
        </button>
      </div>
    </div>
  );
};
