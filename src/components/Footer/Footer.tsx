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
        <p className={styles.footerWords}>GITHUB</p>
        <p className={styles.footerWords}>CONTACTS</p>
        <p className={styles.footerWords}>RIGHTS</p>
        <div className={styles.backToTop}>
          <p className={styles.backToTopWords}>Back to top</p>
          <button className={styles.backToTopButton} onClick={handleClick}>&gt;</button>
        </div>
      </div>
    </>
  );
}
