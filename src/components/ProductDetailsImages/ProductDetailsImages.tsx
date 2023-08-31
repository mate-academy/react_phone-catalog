import { useState } from 'react';
import './ProductDetailsImages.scss';
import { IMG_LINK } from '../../utils/fetchClient';

type Props = {
  images: string[],
};

export const ProductDetailsImages: React.FC<Props> = ({ images }) => {
  const [currentTitleImage, setCurrentTitleImage] = useState(images[0]);

  return (
    <div className="product-card">
      <div className="product-card__container">
        <div className="product-card__small-list">
          {images.map(image => (
            <button
              type="button"
              className="product-card__small-item"
              key={image}
              onClick={() => setCurrentTitleImage(image)}
            >
              <img
                src={IMG_LINK + image}
                width="66px"
                height="66px"
                alt="phone"
                className="product-card__small-img"
              />
            </button>
          ))}
        </div>
      </div>

      <img
        src={IMG_LINK + currentTitleImage}
        alt="phone"
        width="442"
        height="442"
        className="product-card__big-img"
      />
    </div>
  );
};
