import { HomeCarusel } from '../HomeCarusel/HomeCarusel';
import style from './HeroSection.module.scss';

import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className={`${style.title} title`}>{t('main.title')}</h1>
        </div>

        <div className={style.container}>
          <HomeCarusel />
        </div>
      </section>
    </>
  );
};
