import { useEffect, useState } from 'react';
import cn from 'classnames';

import { IProductDetails } from '../../types';

import './ProductImagesSection.scss';

type Props = {
  productDetails: IProductDetails;
};

export const ProductImagesSection: React.FC<Props> = ({ productDetails }) => {
  const [selectedImage, selectImage] = useState('');

  useEffect(() => {
    selectImage(productDetails.images[0] || '');
  }, [productDetails]);

  return (
    <section className="product-images">
      <div className="product-images__side-images">
        {productDetails.images.map(el => (
          <img
            src={`${el}`}
            alt={productDetails.name}
            className={cn('product-images__side-image', {
              'product-images__side-image--selected': el === selectedImage,
            })}
            key={el}
            role="presentation"
            onClick={() => selectImage(el)}
          />
        ))}
      </div>

      <img
        src={selectedImage}
        alt={productDetails.name}
        className="product-images__main-image"
      />
    </section>
  );
};
