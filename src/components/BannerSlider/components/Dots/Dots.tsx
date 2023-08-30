import classNames from 'classnames';
import './Dots.scss';

type Props = {
  images: string [][],
  currentSlideIndex: number,
};

export const Dots: React.FC<Props> = ({ images, currentSlideIndex }) => {
  return (
    <div className="dots">
      {images.map((_, ind) => (
        <div className={classNames('dots__dot', {
          'dots__dot--active': ind === currentSlideIndex,
        })}
        />
      ))}
    </div>
  );
};
