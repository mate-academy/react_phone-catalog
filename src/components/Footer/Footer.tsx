import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.footer_wrapper}>
          <Link to={'../'}>
            <img
              className={styles.footer_wrapper_logo}
              src="img/logo.png"
              alt="footer_logo"
              onClick={scrollToTop}
            />
          </Link>

          <div className={styles.footer_wrapperNavbar}>
            <ul>
              <Link
                target="_blank"
                to={'https://github.com/AvramenkoMarina/react_phone-catalog'}
              >
                <li>github</li>
              </Link>
              <Link
                target="_blank"
                to={'https://github.com/AvramenkoMarina/react_phone-catalog'}
              >
                <li>contacts</li>
              </Link>
              <Link target="_blank" to={''}>
                <li>rights</li>
              </Link>
            </ul>
          </div>

          <div className={styles.footer_wrapperButtonToTop}>
            <p>Back to top</p>
            <img
              onClick={scrollToTop}
              src="img/icons/Chevron.svg"
              alt="toTop"
            />
          </div>
        </div>
      </div>
    </>
  );
};
