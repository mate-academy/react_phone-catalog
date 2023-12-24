import { Image } from '../../../../types/others/types';
import './Slide.scss';

type Props = {
  image: Image;
};

export const Slide: React.FC<Props> = ({ image }) => {
  return (
    <li
      className="banner-slider__item"
    >
      <img
        src={image.url}
        className="banner-slider__image"
        alt={`Banner ${image.id}`}
      />
    </li>
  );
};
