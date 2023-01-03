import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  images: string[] | undefined;
  id: string | undefined;
};

export const ProductDetailsImages: React.FC<Props> = ({ images, id }) => {
  const [currentImg, setCurrentImg] = useState(images?.[0]);

  const handleChangeImage = (img: string) => {
    setCurrentImg(img);
  };

  return (
    <div className="product-details__images">
      <div className="product-details__images__buttons">
        {images?.map(image => (
          <button
            key={image}
            type="button"
            className={classNames(
              'product-details__images__buttons__button',
              // eslint-disable-next-line max-len
              { 'product-details__images__buttons__button-isActive': image === currentImg },
            )}
            onClick={() => handleChangeImage(image)}
          >
            <img
              className="product-details__images__buttons__img"
              alt={id}
              src={image}
            />
          </button>
        ))}
      </div>

      <div className="product-details__images__main-image">
        <img
          alt={id}
          src={currentImg}
        />
      </div>
    </div>
  );
};
