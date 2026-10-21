import styles from './Footer.module.scss';
import sliderButton from '../../img/icons/Slider_button.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img src="/img/icons/Logo.svg" alt="Nice Gadgets" />
        </a>

        <nav className={styles.navigation}>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GITHUB
          </a>

          <a href="#contacts">CONTACTS</a>

          <a href="#rights">RIGHTS</a>
        </nav>

        <a href="#top" className={styles.backToTop}>
          Back to top
          <span className={styles.backToTopButton}>
            <img src={sliderButton} alt="" />
          </span>
        </a>
      </div>
    </footer>
  );
};
