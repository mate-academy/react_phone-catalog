import cn from 'classnames';
import './CardSliderButt.scss';

type Props = {
  img: string;
  isDis: boolean;
  move: () => void;
};

const CardSliderButt: React.FC<Props> = ({ img, isDis, move }) => (
  <button
    type="button"
    className={cn(
      'card-slider-button',
      { 'card-slider-button--dis': isDis },
    )}
    onClick={move}
  >
    <img src={img} alt="icon" />
  </button>
);

export default CardSliderButt;
