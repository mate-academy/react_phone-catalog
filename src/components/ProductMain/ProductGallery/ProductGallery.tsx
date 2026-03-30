import './ProductGallery.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import { useEffect, useState } from 'react';

type ProductGalleryProps = {
  currentProduct: ProductDetails;
};

const ProductGallery = ({ currentProduct }: ProductGalleryProps) => {
  const [activeImg, setActiveImg] = useState(currentProduct.images[0]);

  useEffect(() => {
    setActiveImg(currentProduct.images[0]);
  }, [currentProduct]);

  return (
    <>
      <div className="product-gallery">
        <img
          src={activeImg}
          alt="product"
          className="product-gallery__main-image"
        />

        <div className="product-gallery__list">
          {currentProduct.images.map(img => (
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
