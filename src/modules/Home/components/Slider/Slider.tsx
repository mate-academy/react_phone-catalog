import { ArrowRightSVG } from '../../../../assets/ArrowRightSVG';
import s from './Slider.module.scss';

export const Slider = () => {
  const FIRST_SLIDE_PATH = '../../../../../public/img/banner-phones.png';

  const isRightDisabled = false;

  return (
    <div className={`${s.banner} ${s.container}`}>
      <div className={s.slider}>
        <button className={s.button}></button>
        <img src={FIRST_SLIDE_PATH} alt="" className={s.slider__content} />
        <button className={s.slider__button} disabled={isRightDisabled}>
          <ArrowRightSVG isDisabled={isRightDisabled} />
        </button>
      </div>
      <div className={s.banner__indicator}></div>
    </div>
  );
};
