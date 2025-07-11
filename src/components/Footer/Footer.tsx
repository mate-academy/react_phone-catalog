import { Logo } from '../../assets/images';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer__container}>
      <div className={`${styles.footer} container`}>
        <div className={styles.footer__logo}>
          <img src={Logo} alt="nice gadgets" />
        </div>
        <div className={styles.footer__nav}>
          <a href="https://github.com/KateLis84/react_phone-catalog">GITHUB</a>
          <a href="mailto:emma12022002@gmail.com">CONTACTS</a>
          <a href="https://i.imgflip.com/1iphel.jpg">RIGHTS</a>
        </div>
        <div className={styles.footer__toTopBtn} onClick={handleBackToTop}>
          <div>Back to top</div>
          <button>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
