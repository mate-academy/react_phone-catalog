import { useCallback, useEffect, useRef, useState } from 'react';
import style from './SliderTop.module.scss';
import classNames from 'classnames';

export const SliderTop = () => {
  const [sliderWidht, setSliderWidht] = useState(0);
  const [widthImg, setWidthImg] = useState(0);
  const divBlock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divBlock.current) {
      setWidthImg(divBlock.current.clientWidth);
    }
  }, []);

  const nextSlider = useCallback(() => {
    if (sliderWidht >= widthImg * 2) {
      setSliderWidht(0);
    } else {
      setSliderWidht(carentValue => carentValue + widthImg);
    }
  }, [widthImg, sliderWidht]);

  useEffect(() => {
    const interval = setInterval(() => nextSlider(), 5000);

    return () => clearInterval(interval);
  }, [sliderWidht, widthImg, nextSlider]);

  const backSlider = () => {
    if (sliderWidht > 0 && widthImg) {
      setSliderWidht(carentValue => carentValue - widthImg);
    }
  };

  return (
    <div className={style.slider}>
      <h1 className={style.slider__title}>Welcome to Nice Gadgets store!</h1>
      <div className={style.slider__container}>
        <button
          className={`${style.slider__back} ${style.slider__button}`}
          onClick={backSlider}
        />
        <div className={style.slider__img}>
          <div
            style={{
              transform: `translateX(-${sliderWidht}px)`,
            }}
            className={style.slider__gallery}
          >
            <div
              ref={divBlock}
              id="widthImgId"
              className={`${style.slider__photo}
                ${style.slider__banner}`}
            ></div>

            <div
              className={`${style.slider__banner}
              ${style.slider__banner__2}`}
            ></div>

            <div
              className={`${style.slider__banner}
                ${style.slider__banner__3}`}
            ></div>
          </div>
        </div>
        <button
          onClick={nextSlider}
          className={`${style.slider__forward} ${style.slider__button}`}
        />
      </div>

      <div className={style.slider__wraper}>
        <button
          onClick={() => setSliderWidht(0)}
          className={style.slider__pointer}
        >
          <span
            className={classNames(`${style.slider__indicator}`, {
              [style.slider__active]: sliderWidht === 0,
            })}
          ></span>
        </button>

        <button
          onClick={() => setSliderWidht(widthImg)}
          className={style.slider__pointer}
        >
          <span
            className={classNames(style.slider__indicator, {
              [style.slider__active]: sliderWidht === widthImg,
            })}
          ></span>
        </button>

        <button
          onClick={() => setSliderWidht(widthImg * 2)}
          className={style.slider__pointer}
        >
          <span
            className={classNames(style.slider__indicator, {
              [style.slider__active]: sliderWidht === widthImg * 2,
            })}
          ></span>
        </button>
      </div>
    </div>
  );
};
