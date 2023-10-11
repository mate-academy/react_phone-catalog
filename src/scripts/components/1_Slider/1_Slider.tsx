import React, {
  useState,
} from 'react';
import classNames from 'classnames';

import './slider.scss';

type Props = {
  image: string[];
};

export const Slider: React.FC<Props> = ({ image }) => {
  const [img, setImg] = useState(image[0]);

  return (
    <>
      <div className="slider">
        <div className="slider__small-photo">
          {image.map(item => (
            <button
              key={item}
              type="button"
              className={
                classNames('slider__small-wrap', { activePhoto: img === item })
              }
              onClick={() => setImg(item)}
            >
              <img
                src={`../${item}`}
                className="slider__small-img"
                alt={item}
              />
            </button>
          ))}
        </div>

        <div className="slider__main-photo">
          <img
            className="slider__main-img"
            src={`../${img}`}
            alt={img}
          />
        </div>
      </div>
    </>
  );
};
