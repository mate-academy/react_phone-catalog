import './MainSliderButton.scss';
import { Buttons } from '../../../types/Buttons';

type Props = {
  onClick?: () => void;
  type: Buttons;
};

const MainSliderButton: React.FC<Props> = ({ onClick, type }) => {
  const img = type === Buttons.prev
    ? './icons/left.svg'
    : './icons/right.svg';

  return (
    <button
      type="button"
      className="main-slider-button"
      onClick={onClick}
      aria-label="arrow"
    >
      <img src={img} alt="icon" />
    </button>
  );
};

export default MainSliderButton;
