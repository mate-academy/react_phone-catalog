import './style.scss';
import leftArrow from './icons/left-arrow.svg';
import rightArrow from './icons/right-arrow.svg';

type Props = {
  direction: 'next' | 'prev',
  moveSlide: () => void
};

export const BtnSliderBanner: React.FC<Props> = ({ direction, moveSlide }) => {
  return (
    <button
      type="button"
      className={
        direction === 'next'
          ? 'btn-slide next'
          : 'btn-slide prev'
      }
      onClick={moveSlide}
    >
      <img
        src={direction === 'next' ? rightArrow : leftArrow}
        alt="next"
      />
    </button>
  );
};
