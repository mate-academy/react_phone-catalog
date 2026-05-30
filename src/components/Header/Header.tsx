import { MySwiper } from '../swiper/index';
import styles from './Header.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h2 className={styles.header__title}>{t('messages.welcome')}</h2>

      <MySwiper />
    </header>
  );
};
