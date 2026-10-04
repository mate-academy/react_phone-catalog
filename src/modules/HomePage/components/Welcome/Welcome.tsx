import welcomeStyles from '@/modules/HomePage/components/Welcome/Welcome.module.scss';
import stylesContainer from '@/shared/styles/Container.module.scss';
import { useTranslation } from 'react-i18next';

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <section className={welcomeStyles.welcome}>
      <div className={stylesContainer.container}>
        <div className={welcomeStyles.welcome__titleBlock}>
          <h2 className={welcomeStyles.welcome__title}>{t('home.welcome')}</h2>
        </div>
      </div>
    </section>
  );
};
