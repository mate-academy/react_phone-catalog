import classNames from 'classnames';
import { FC, useState } from 'react';

import './ProductImagesSlider.scss';

type Props = {
  images: string[];
};

export const ProductImagesSlider: FC<Props> = ({ images }) => {
  const [isSelected, setIsSelected] = useState(images[0]);

  return (
    <div className="slider">
      <div className="slider__col">
        {images.map((image) => (
          <button
            key={image}
            aria-label="image"
            type="button"
            className={classNames('slider__button', {
              'slider__button--active': isSelected === image,
            })}
            style={{ backgroundImage: `url(_new/${image})` }}
            onClick={() => setIsSelected(image)}
          />
        ))}
      </div>
      <img className="slider__main" src={`_new/${isSelected}`} alt="main" />
    </div>
  );
};
