import classNames from 'classnames';
import { sliderImgs } from '../../data/data';

type Props = {
  currentIndex: number;
  onSlideChange: React.Dispatch<React.SetStateAction<number>>;
};

export const SliderNav: React.FC<Props> = ({ currentIndex, onSlideChange }) => {
  return (
    <div className="slider__navigation">
      {sliderImgs.map((item, index) => (
        <div
          aria-hidden="true"
          key={item.id}
          className={classNames(
            'slider__dot',
            { 'slider__dot--active': sliderImgs[currentIndex].id === item.id },
          )}
          onClick={() => onSlideChange(index)}
          onKeyDown={() => onSlideChange(index)}
        />
      ))}
    </div>
  );
};
