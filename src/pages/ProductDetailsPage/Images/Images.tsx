import React, { useState } from 'react';
import classnames from 'classnames';
import './Images.scss';

type ProductImagesType = {
  productImages: string[];
};

export const Images: React.FC<ProductImagesType> = ({ productImages }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="Images">
      <div className="Images-Small">
        {productImages.map((image, index) => (
          <button
            key={image}
            type="button"
            className={classnames(
              'Images-Button',
              { 'Images-Button_active': index === selectedImage },
            )}
            onClick={() => {
              setSelectedImage(index);
            }}
          >
            <img
              className="Images-SmallImage"
              src={image}
              alt="product-small"
            />
          </button>
        ))}
      </div>

      <div className="Images-Big">
        <img
          className="Images-BigImage"
          src={productImages[selectedImage]}
          alt="product-big"
        />
      </div>
    </div>

  );
};
