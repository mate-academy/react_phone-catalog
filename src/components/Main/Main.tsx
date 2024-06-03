import style from '../Main/Main.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext } from 'react';
export const Main = () => {
  const { t } = useContext(LanguageContext);

  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.main__content}>
          <section className={style.brandNewModels}>
            <h2>{t('newModels')}</h2>
          </section>
        </div>
      </div>
    </main>
  );
};
