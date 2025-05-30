import { useState } from 'react';
import { ArrowLeftSVG } from '../../../../assets/ArrowLeftSVG';
import { ArrowRightSVG } from '../../../../assets/ArrowRightSVG';
import s from './Slider.module.scss';

export const Slider = () => {
  const [index, setIndex] = useState(1);
  const sliderData = [
    { title: 'Power in Your Pocket', path: 'phones' },
    { title: 'Performance Meets Portability', path: 'tablets' },
    { title: 'Pure Sound. No Strings', path: 'accesories' },
  ];
  const isLeftDisabled = index === 1;
  const isRightDisabled = index === sliderData.length;

  return (
    <div className={`${s.banner} ${s.container}`}>
      <div className={s.slider}>
        <button
          className={s.slider__button}
          disabled={isLeftDisabled}
          onClick={() => setIndex(index - 1)}
        >
          <ArrowLeftSVG isDisabled={isLeftDisabled} width={32} />
        </button>
        {sliderData.slice(index - 1, index).map(slide => {
          return (
            <div className={s.slide} key={slide.title}>
              <div className={s.slide__descryption}>
                <span className={s.slide__descryption__title}>
                  {slide.title}
                </span>
                <a href="" className={s.slide__descryption__button}>
                  Add to cart
                </a>
              </div>
              <div className={s.container__img}>
                <img
                  className={s.slide__img}
                  src={`./slider/${index}.jpg`}
                  alt=""
                />
              </div>
            </div>
          );
        })}
        <button
          className={s.slider__button}
          disabled={isRightDisabled}
          onClick={() => setIndex(index + 1)}
        >
          <ArrowRightSVG isDisabled={isRightDisabled} width={32} />
        </button>
      </div>
      <div className={s.banner__indicator}></div>
    </div>
  );
};
