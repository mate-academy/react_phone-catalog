import { Logo } from '@/components/Logo';
import styles from './styles.module.scss';
import { ButtonSecond } from '@/components/ButtonSecond/ButtonSecond';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.main}>
      <Logo type="Footer"></Logo>

      <div className={styles.linksBox}>
        <a
          className={styles.link}
          target="_blank"
          href="https://github.com/RuslanV23/react_phone-catalog"
        >
          Github
        </a>
        <a className={styles.link} target="_blank" href="https://github.com/RuslanV23">
          {t('footer.contacts')}
        </a>
        <a
          className={styles.link}
          target="_blank"
          href="https://github.com/RuslanV23/react_phone-catalog/blob/master/README.md"
        >
          {t('footer.right')}
        </a>
      </div>

      <div className={styles.scrollTopBox}>
        <p className={styles.scrollTopText}>{t('footer.backToTop')}</p>
        <ButtonSecond
          aria-label={t('footer.backToTop')}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className={styles.buttonScrollTop}
          rotate={270}
        ></ButtonSecond>
      </div>
    </footer>
  );
};
