import styles from './Footer.module.scss';
import sliderButton from '../../img/icons/Slider_button.svg';
import { withBase } from '../../utils/withBase';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href={withBase('/')} className={styles.logo}>
          <img src={withBase('/img/icons/Logo.svg')} alt="Nice Gadgets" />
        </a>

        <nav className={styles.navigation}>
          <a
            href="https://github.com/YaroslavKra/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>

          <a href={withBase('#contacts')}>CONTACTS</a>

          <a href={withBase('#rights')}>RIGHTS</a>
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
