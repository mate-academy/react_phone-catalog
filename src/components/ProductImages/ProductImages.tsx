import React, { useState } from 'react';
import './ProductImages.scss';
import cn from 'classnames';

type ProductImages = {
  productDetails: ProdactDetails;
};

const ProductImages: React.FC<ProductImages> = ({ productDetails }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImages = (e: React.MouseEvent<HTMLElement>, i: number) => {
    e.preventDefault();
    setActiveImageIndex(i);
  };

  return (
    <section className="ImagesProduct">
      <ul className="ImagesProduct__ImageList">
        {productDetails.images.map((image, i) => (
          <li
            className={cn({
              'ImagesProduct__Image--current': i === activeImageIndex,
            },
            'ImagesProduct__ImageItem')}
            key={image}
          >
            <a href="./#" onClick={e => handleImages(e, i)}>
              <img
                src={image}
                alt={productDetails.name}
                className="ImagesProduct__Image"
              />
            </a>
          </li>
        ))}
      </ul>
      <img
        src={productDetails.images[activeImageIndex]}
        alt={productDetails.name}
        className="ImagesProduct__ImageBig"
      />
    </section>
  );
};

export default ProductImages;
