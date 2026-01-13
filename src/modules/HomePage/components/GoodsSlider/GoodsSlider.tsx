/* eslint-disable max-len */

import s from './GoodsSlider.module.scss';
import Stroke_right from '/img/icons/Stroke_right.svg';
import Stroke_left from '/img/icons/Stroke_left.svg';
import Rectangle from '/img/icons/Rectangle.svg';
// import { ReactComponent as Right } from '/img/icons/Stroke_right.svg';

export const GoodsSlider = () => {
  return (
    <div className={`BannerSlider ${s.banner_slider}`}>
      <h2 className="title">Brand new models</h2>
      {/* Brand new models slider content goes here */}
      <div className="is-flex">
        <button type="button" className={s.banner_slider_button}>
          <img className={s.stroke_icon} src={Stroke_left} alt="Previous" />
        </button>
        <div className={`mx-4 ${s.banner_item}`}>
          <img
            className={s.banner_item}
            src="/img/banner-new-phone/hero__bdntboqignj6_xlarge.jpg"
            alt="Iphone 17 Pro Max"
          />
        </div>
        <div className={`mx-4 ${s.banner_item}`}>
          <img
            className={s.banner_item}
            src="/img/banner-new-phone/highlights_design_endframe__flnga0hibmeu_large_2x.jpg"
            alt="Iphone 17 Pro Max"
          />
        </div>
        <div className={`mx-4 ${s.banner_item}`}>
          <img
            className={s.banner_item}
            src="/img/banner-new-phone/highlights_ios__empnwsdz698i_large_2x.jpg"
            alt="Iphone 17 Pro Max"
          />
        </div>
        <button type="button" className={s.banner_slider_button}>
          <img className={s.stroke_icon} src={Stroke_right} alt="Next" />
        </button>
      </div>
      <div className="buttons mt-5 is-flex is-justify-content-center is-align-items-center is-gap-3">
        <button type="button">
          <img src={Rectangle} alt="Slider Button" />
        </button>
        <button type="button">
          {/* <Right /> */}
          <img src={Rectangle} alt="Slider Button" />
        </button>
        <button type="button">
          <img src={Rectangle} alt="Slider Button" />
        </button>
      </div>
    </div>
  );
};
