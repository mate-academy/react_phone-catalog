import s from './Slider.module.scss';

export const Slider = () => {
  const FIRST_SLIDE_PATH = '../../../../../public/img/banner-phones.png';

  return (
    <div className={`${s.banner} ${s.container}`}>
      <div className={s.slider}>
        <button className={`${s.slider__left} ${s.button}`}></button>
        <img src={FIRST_SLIDE_PATH} alt="" className={s.slider__content} />
        <button className={`${s.slider__right} ${s.button}`}></button>
      </div>
      <div className={s.banner__indicator}></div>
    </div>
  );
};
