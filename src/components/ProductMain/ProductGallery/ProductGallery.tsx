import './ProductGallery.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import { useState } from 'react';

type ProductGalleryProps = {
  someProduct: ProductDetails;
};

const ProductGallery = ({ someProduct }: ProductGalleryProps) => {
  const [activeImg, setActiveImg] = useState(someProduct.images[0]);

  return (
    <>
      <div className="product-gallery">
        <img
          src={activeImg}
          alt="product"
          className="product-gallery__main-image"
        />

        <div className="product-gallery__list">
          {someProduct.images.map(img => (
            <img
              key={img}
              src={img}
              className={`product-gallery__thumb ${
                activeImg === img ? 'active' : ''
              }`}
              onClick={() => setActiveImg(img)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
