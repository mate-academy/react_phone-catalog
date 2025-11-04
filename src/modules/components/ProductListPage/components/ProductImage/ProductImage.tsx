import React, { useEffect, useState } from 'react';
import './ProductImage.scss';
import type { ProductDetails } from '../../../../shared/types/ProductDetails';
import classNames from 'classnames';

type ProductImageProps = {
  selectedProduct: ProductDetails;
};

export const ProductImage: React.FC<ProductImageProps> = ({
  selectedProduct,
}) => {
  const imageList: string[] = selectedProduct.images;

  const [currentImage, setCurrentImage] = useState<string>(imageList[0]);

  useEffect(() => {
    setCurrentImage(imageList[0]);
  }, [selectedProduct]);

  return (
    <div className="product-image">
      <div className="product-image__main">
        <img
          className="product-image__img"
          src={currentImage}
          alt="product photo"
        />
      </div>
      <div className="product-image__options">
        {imageList.map(image => (
          <button
            className={classNames('product-image__options__item', {
              'product-image__options__item--active': image === currentImage,
            })}
            onClick={() => setCurrentImage(image)}
            key={image}
          >
            <img
              className="product-image__img"
              src={image}
              alt="product photo"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
