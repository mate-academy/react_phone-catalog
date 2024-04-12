import classNames from 'classnames';
import { useState } from 'react';
import { useSwiper } from 'swiper/react';
import './swiperButtons.scss';
import ArrowRight from '../../../images/icons/arrow_right_small.svg';
import ArrowLeft from '../../../images/icons/arrow_left.svg';
import ArrowRightDisabled from '../../../images/icons/Arrow_Right_disabled.svg';
import ArrowLeftDisabled from '../../../images/icons/arrow_left_disabled.svg';

export const SwiperButtons = () => {
  const swiper = useSwiper();
  const [isEnd, setIsEnd] = useState(false);
  const [isBegin, setIsBegin] = useState(true);

  const handleClickNext = () => {
    swiper.slideNext();
    swiper.updateProgress();
    setIsEnd(swiper.isEnd);
    setIsBegin(swiper.isBeginning);
  };

  const handleClickPrev = () => {
    swiper.slidePrev();
    swiper.updateProgress();
    setIsBegin(swiper.isBeginning);
  };

  return (
    <div className="swiperButtons">
      <button
        type="button"
        disabled={isBegin}
        className={classNames(
          'swiperButtonsPrev',
          { 'swiperButtonsPrev--disabled': isBegin },
        )}
        onClick={() => handleClickPrev()}
      >
        <img
          src={isBegin ? ArrowLeftDisabled : ArrowLeft}
          alt="arrow left"
        />
      </button>

      <button
        type="button"
        className={classNames(
          'swiperButtonsNext',
          { 'swiperButtonsNext--disabled': isEnd },
        )}
        disabled={isEnd}
        onClick={() => handleClickNext()}
      >
        <img
          src={isEnd ? ArrowRightDisabled : ArrowRight}
          alt="arrow right"
        />
      </button>
    </div>
  );
};
