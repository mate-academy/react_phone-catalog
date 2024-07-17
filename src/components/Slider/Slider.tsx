import slider1 from '../../assets/img/slider/slider-1.png';
import slideActive from '../../assets/img/slider/slide-active.png';
import slideUnactive from '../../assets/img/slider/slide-unactive.png';
import style from './Slider.module.scss';

export const Slider = () => (
  <div className={style.slider}>
    <img src={slider1} className={style.slider__img} />
    <div className={style.slider__slides}>
      <img src={slideActive} />
      <img src={slideUnactive} />
      <img src={slideUnactive} />
    </div>
  </div>
);
