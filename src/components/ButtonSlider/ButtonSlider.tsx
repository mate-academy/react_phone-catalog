import { ICONS } from '../../icons';
import './ButtonSlider.scss';

type Props = {
  moveSlide: () => void,
  direction: string,
  height?: number,
};

export const ButtonSlider: React.FC<Props> = ({
  moveSlide,
  direction,
  height,
}) => {
  return (
    <button
      className={`button banner__button ${direction === 'next' ? 'button next' : 'button prev'}`}
      type="button"
      onClick={moveSlide}
      style={{ height: `${height}px` }}
    >
      <img
        src={direction === 'next' ? ICONS.arrowRight : ICONS.arrowLeft}
        alt="button arrow"
      />
    </button>
  );
};
