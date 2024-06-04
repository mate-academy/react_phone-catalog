import style from '../Main/Main.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext } from 'react';
import { StateContext } from '../../store/StateProvider';
import { Slider } from './Slider/Slider';

export const Main = () => {
  const { t } = useContext(LanguageContext);
  const { openBurger } = useContext(StateContext);

  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.main__content}>
          <h1 className={style.main__title}>{t('welcome')}</h1>
          <section className={style.slider}>
            {!openBurger && (
              <div className={style.main__bottom}>
                <div className={style.main__content}>
                  <Slider />
                </div>
              </div>
            )}
          </section>
          <section className={style.brandNewModels}>
            <h2>{t('newModels')}</h2>
          </section>
        </div>
      </div>
    </main>
  );
};
