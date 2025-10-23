import { Carusel } from '@GlobalComponents';
import style from './NewModels.module.scss';

export const NewModels = () => {
  return (
    <section className="section">
      <div className="container">
        <div className={style.header}>
          <h2 className={`title-section ${style.title}`}>Brand new models</h2>
          <div className={style.arrows}>
            <button type="button" className={style.arrow__next}>
              <span className={style.arrow__left}></span>
            </button>
            <div className={style.arrow__prev}>
              <button type="button" className={style.arrow__right}></button>
            </div>
          </div>
        </div>
      </div>

      <Carusel />
    </section>
  );
};
