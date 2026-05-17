import { useTranslation } from 'react-i18next';
import { AboutDescs } from '../AboutDesc';
import styles from './About.module.scss';

export const About = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.product__about}>
      <h3 className={styles.subtitle}>
        {t('details_page.about_section_title')}
      </h3>

      <hr className={styles.line} />

      <AboutDescs />
    </div>
  );
};
