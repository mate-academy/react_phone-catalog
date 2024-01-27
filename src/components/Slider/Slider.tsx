import './Slider.scss';
// import image from '../../../public/_new/img/banner-phones.png';
// import { url } from 'inspector';

export const Slider = () => {
  return (
    <div className="slider">
      <div className="slider__content">
        <button className="slider__content__button" type="button">{'<'}</button>
        <div className="slider__content__image" />
        <button className="slider__content__button" type="button">{'>'}</button>
      </div>
      <div className="slider__dots">
        <div className="slider__dots-dot" />
        <div className="slider__dots-dot" />
        <div className="slider__dots-dot" />
      </div>
    </div>
  );
};
