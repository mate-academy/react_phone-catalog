import { SwiperBaner } from '../component/UIKit/SwiperBaner';
import style from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={style.section}>
      <div className={style.heroContainer}>
        <SwiperBaner />
      </div>
    </section>
  );
};
