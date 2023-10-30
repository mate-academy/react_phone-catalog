import { FC, useState } from 'react';
import './ProductImages.scss';

type Props = {
  images: string[];
};

export const ProductImages: FC<Props> = ({ images }) => {
  const [mainImg, setMainImg] = useState(images?.slice(0, 1).join(''));

  const onChangeImg = (imgUrl: string) => {
    if (imgUrl === mainImg) {
      return;
    }

    setMainImg(imgUrl);
  };

  return (
    <div className="product-images">
      <div className="product-images__container">
        {images?.map(imgUrl => (
          <button
            key={imgUrl}
            type="button"
            aria-label="change-img-button"
            className="product-images__picture"
            style={{ backgroundImage: `url(${imgUrl})` }}
            onClick={() => onChangeImg(imgUrl)}
          />
        ))}
      </div>
      <img
        src={mainImg}
        alt="product"
        className="product-details__selected-picture"
      />
    </div>
  );
};
