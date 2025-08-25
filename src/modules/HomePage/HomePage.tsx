import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import Slider from './Slider';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2 className={[styles.header__title].join(' ')}>
        {t('home.welcome_to_store')}
      </h2>

      <div className={styles['slider-wrapper']}>
        <Slider />
      </div>
    </div>
  );
};

export default HomePage;
