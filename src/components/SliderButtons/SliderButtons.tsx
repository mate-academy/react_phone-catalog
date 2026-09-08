import { ArrowIcon } from '../Icons/ArrowIcon';
import './SliderButtons.scss';

type Props = {
  type: string;
};

export const SliderButtons: React.FC<Props> = ({ type }) => (
  <div className="swiper-buttons-wrapper">
    <button className={`swiper-button-prev-${type}`}>
      <ArrowIcon />
    </button>
    <button className={`swiper-button-next-${type}`}>
      <ArrowIcon />
    </button>
  </div>
);
