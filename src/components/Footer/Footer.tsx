import styles from './Footer.module.scss';
import Logo from '../Logo/index';

type Props = {
  onBackToTop: () => void;
};

export const Footer: React.FC<Props> = ({ onBackToTop }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.topBarMobile}>
          <div>
            <Logo className={styles.footer__logo} />
            <div>
              <a
                href="https://github.com/"
                className={`${styles.link} ${styles.footer__github}`}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
              <a
                href="https://github.com/zhyliaieva/"
                className={`${styles.link} ${styles.footer__contacts}`}
                target="_blank"
                rel="noreferrer"
              >
                Contacts
              </a>
              <a
                href="https://github.com/zhyliaieva/"
                className={`${styles.link} ${styles.footer__rights}`}
                target="_blank"
                rel="noreferrer"
              >
                rights
              </a>
            </div>
            <button
              className={`${styles.link} ${styles.footer__backToTop}`}
              type="button"
              onClick={onBackToTop}
            >
              Back&nbsp;to&nbsp;top&nbsp;
              <span
                className={`${styles.icon}  ${styles['icon--button-slider-right']}`}
              ></span>
            </button>
          </div>
        </div>
        <div className={styles.topBar}>
          <Logo className={styles.footer__logo} />

          <a
            href="https://github.com/"
            className={`${styles.link} ${styles.footer__github}`}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://github.com/zhyliaieva/"
            className={`${styles.link} ${styles.footer__contacts}`}
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>

          <a
            href="https://github.com/zhyliaieva/"
            className={`${styles.link} ${styles.footer__rights}`}
            target="_blank"
            rel="noreferrer"
          >
            rights
          </a>
          <button
            className={`${styles.link} ${styles.footer__backToTop}`}
            type="button"
            onClick={onBackToTop}
          >
            Back&nbsp;to&nbsp;top&nbsp;
            <span
              className={`${styles.icon}  ${styles['icon--button-slider-right']}`}
            ></span>
          </button>
        </div>
      </div>
    </footer>
  );
};
