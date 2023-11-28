import classNames from 'classnames';
import { FC, useState } from 'react';

import './ProductImagesSlider.scss';

type Props = {
  images: string[];
};

export const ProductImagesSlider: FC<Props> = ({ images }) => {
  const [isSelected, setIsSelected] = useState(images[0]);

  return (
    <div className="sliders">
      <div className="sliders__col">
        {images.map((image) => (
          <button
            key={image}
            aria-label="image"
            type="button"
            className={classNames('sliders__button', {
              'sliders__button--active': isSelected === image,
            })}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setIsSelected(image)}
          />
        ))}
      </div>
      <img className="sliders__main" src={`${isSelected}`} alt="main" />
    </div>
  );
};
