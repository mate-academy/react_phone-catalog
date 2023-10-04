import classNames from 'classnames';
import { ImageType } from 'components/BannerSlider/BannerSlider';
import './Dots.scss';

type Props = {
  images: ImageType[],
  currentSlideIndex: number,
};

export const Dots: React.FC<Props> = ({ images, currentSlideIndex }) => {
  return (
    <div className="dots">
      {images.map((image, ind) => (
        <div
          key={image.id}
          className={classNames('dots__dot', {
            'dots__dot--active': ind === currentSlideIndex,
          })}
        />
      ))}
    </div>
  );
};
