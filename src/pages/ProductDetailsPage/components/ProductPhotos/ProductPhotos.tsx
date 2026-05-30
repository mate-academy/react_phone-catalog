import React from 'react';
import classNames from 'classnames';
import { ProductDetails } from '../../../../types';

type Props = {
  productDetails: ProductDetails;
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
};

export const ProductPhotos: React.FC<Props> = ({
  productDetails,
  selectedImage,
  onImageSelect,
}) => (
  <div className="product-details__photos">
    <div className="product-details__photos-preview">
      <ul className="product-details__photos-preview-list">
        {productDetails.images.map(image => (
          <li
            key={image}
            className={classNames('product-details__photos-preview-item ', {
              selected: selectedImage === image,
            })}
            onClick={() => onImageSelect(image)}
          >
            <img src={image} alt={productDetails.name} />
          </li>
        ))}
      </ul>
    </div>
    <div className="product-details__photos-main">
      <img
        src={selectedImage || productDetails.images[0]}
        alt={productDetails.name}
      />
    </div>
  </div>
);
