import { useSwiper } from 'swiper/react';
import './swiperButtonNext.scss';
import { useState } from 'react';
import classNames from 'classnames';
import ArrowRight from '../../../images/icons/arrow_right_small.svg';
// import classNames from 'classnames';

// type Props = {
//   onClick: ()=> void,
//   // isEnd: boolean,
// };

export const SwipperButtonNext: React.FC = () => {
  const swiper = useSwiper();
  const [isEnd, setIsEnd] = useState(swiper.isEnd);

  const handleClick = () => {
    swiper.slideNext();
    swiper.updateProgress();
    setIsEnd(swiper.isEnd);
  };

  return (
    <button
      type="button"
      className={classNames(
        'swiperButtonNext',
        { 'swiperButtonNext--disabled': isEnd },
      )}
      // disabled={isEnd}
      onClick={() => handleClick()}
    >
      <img
        src={ArrowRight}
        alt="arrow right"
        className="swiperButtonNext__img"
      />
    </button>
  );
};
