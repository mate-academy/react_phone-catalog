import style from '../Main/Main.module.scss';
import { useContext } from 'react';
import { StateContext } from '../../store/StateProvider';
import { Slider } from './Slider/Slider';
import { BrandNewModels } from './BrandNewModels/BrandNewModels';
import { LanguageContext } from '../../store/LanguageProvider';

export const Main = () => {
  const { openBurger } = useContext(StateContext);
  const { t } = useContext(LanguageContext);

  return (
    <main className={style.main}>
      <div className={style.main__content}>
        <h1 className={style.main__title}>{t('welcome')}</h1>

        <section className={style.main__heroSlider}>
          {!openBurger && <Slider />}
        </section>

        <BrandNewModels />
      </div>
    </main>
  );
};
