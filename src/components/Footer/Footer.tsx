import { Link } from 'react-router-dom';
import { BigLogo } from '../BigLogo/BigLogo';
import styles from '../Footer/FooterStyles.module.scss';

export function Footer() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={styles.footerSection}>
        <div className={styles.logotype}>
          <BigLogo />
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.textToLeft}>
            <Link to={'https://github.com/naz4ik'} className={styles.footerWords}>GITHUB</Link>
          </div>
          <Link to={''} className={styles.footerWords}>CONTACTS</Link>
          <Link to={''} className={styles.footerWords}>RIGHTS</Link>
        </div>
        <div className={styles.backToTop}>
          <p className={styles.backToTopWords}>Back to top</p>
          <button className={styles.backToTopButton} onClick={handleClick}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}
