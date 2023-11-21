import classNames from 'classnames';
import { FC, useState } from 'react';
import './slider.scss';

type Props = {
  images: string[];
};

export const Slider: FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="slider">
      <div className="slider__col">
        {images.map((img) => (
          <button
            key={img}
            aria-label="img"
            type="button"
            className={classNames('slider__button', {
              'slider__button--active': selected === img,
            })}
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>
      <div
        className="slider__main"
        style={{ backgroundImage: `url(${selected})` }}
      />
    </div>
  );
};
