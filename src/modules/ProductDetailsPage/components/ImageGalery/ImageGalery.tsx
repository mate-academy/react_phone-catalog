import { useState } from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import './ImageGalery.scss';
import classNames from 'classnames';

type Props = {
  product: ProductDetails | null;
};

export const ImageGalery: React.FC<Props> = ({ product }) => {
  const images = product ? [...product.images] : [];
  const [selectedImg, setSelectedImg] = useState(0);

  const handleSelect = (index: number) => {
    setSelectedImg(index);
  };

  return (
    <div className="imageGlr__wrapper">
      <div className="imageGlr__bigImageMobWrap">
        <img
          src={images[selectedImg]}
          alt="Product image"
          className="imageGlr__bigImage"
        />
      </div>

      <div className="imageGlr__smallWpar">
        {images.map((image, index) => (
          <div
            key={image}
            className={classNames('imageGlr__smallImg', {
              'imageGlr__smallImg--active': index === selectedImg,
            })}
            onClick={() => handleSelect(index)}
          >
            <img src={image} alt="Product image" className="imageGlr__image" />
          </div>
        ))}
      </div>

      <div className="imageGlr__bigImageWrap">
        <img
          src={images[selectedImg]}
          alt="Product image"
          className="imageGlr__bigImage"
        />
      </div>
    </div>
  );
};
