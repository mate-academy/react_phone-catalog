import { useState } from 'react';
import style from  './SliderTop.module.scss';
import classNames from 'classnames';
// import { Swiper, SwiperSlide } from 'swiper/react';
enum AdjustmentImg {
  First = 0,
  Second = 1050,
  Third = 2100,
}


export const SliderTop = () => {
  const [sliderWidht, setSliderWidht] = useState(0);

  const nextSlider = () => {
    if (sliderWidht === 2100) {
      setSliderWidht(0);
    } else {
      setSliderWidht((carentValue) => carentValue + 1040 + 10);
    }
  }
  const backSlider = () => {
    if (sliderWidht > 0) {
      setSliderWidht((carentValue) => carentValue - 1040 - 10)
    } 
  }

  return (
    <div className={style.slider}>
      <h1 className={style.slider__title}>
      Welcome to Nice Gadgets store!
      </h1>
      <div className={style.slider__container}>
        <button
          className={`${style.slider__back} ${style.slider__button}`}
          onClick={backSlider}
        />
        <div className={style.slider__img}>
          <div
            style={{transform: `translateX(-${sliderWidht}px)` }}
            className={style.slider__gallery}
          >
            <div className={`${style.slider__photo} ${style.slider__banner}`}></div>
            <div className={`${style.slider__banner} ${style.slider__banner__2}`}></div>
            <div className={`${style.slider__banner} ${style.slider__banner__3}`}></div>
          </div>
        </div>
        <button
          onClick={nextSlider}
          className={`${style.slider__forward} ${style.slider__button}`}
        />
      </div>

      <div className={style.slider__wraper}>
        <button
          onClick={() => setSliderWidht(AdjustmentImg.First)}
          className={style.slider__pointer}
        >
          <span
            className={classNames(`${style.slider__indicator}`,{
              [style.slider__active]: sliderWidht === AdjustmentImg.First
            })}
          ></span>
        </button>

        <button
          onClick={() => setSliderWidht(AdjustmentImg.Second)}
          className={style.slider__pointer}
        >
        <span
            className={classNames(style.slider__indicator,{
              [style.slider__active] : sliderWidht === AdjustmentImg.Second
            })}
          ></span>
        </button>

        <button
          onClick={() =>setSliderWidht(AdjustmentImg.Third)}
          className={style.slider__pointer}
          >
          <span
              className={classNames(style.slider__indicator,{
                [style.slider__active]: sliderWidht === AdjustmentImg.Third
              })}
          ></span>
        </button>
      </div>
    </div>
  );
};
