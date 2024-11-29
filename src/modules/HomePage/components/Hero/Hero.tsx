import styles from './Hero.module.scss';
import { Slider } from './Slider';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation('homepage');

  return (
    <section className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>{t('titles.homePageTitle')}</h2>
      <Slider />
    </section>
  );
};
