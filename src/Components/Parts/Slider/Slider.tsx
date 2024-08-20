import classNames from 'classnames';
import { FC, useState } from 'react';
import './Slider.scss';

type Props = {
  images: string[];
};

export const Slider: FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="slider">
      <div className="slider__col">
        {images.map(image => (
          <button
            key={image}
            aria-label="image"
            type="button"
            className={classNames('slider__button', {
              'slider__button--active': selected === image,
            })}
            onClick={() => setSelected(image)}
          >
            <img src={image} alt={image} className="slider__image" />
          </button>
        ))}
      </div>
      <div className="slider__main">
        <img src={selected} alt={selected} className="slider__image--main" />
      </div>
    </div>
  );
};
