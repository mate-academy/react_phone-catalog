import React, { useState } from 'react';
import './ProductImages.scss';

interface ProductImagesProps {
  name: string;
  mainImage: string;
  galleryImages?: string[];
  isDetailsView?: boolean;
}

export const ProductImages: React.FC<ProductImagesProps> = ({
  name,
  mainImage,
  galleryImages,
  isDetailsView = false,
}) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const hasGallery = isDetailsView && galleryImages && galleryImages.length > 0;

  return (
    <div className="product-images">
      {hasGallery ? (
        <>
          <div className="product-images__thumbnails">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`product-images__thumbnail-btn ${
                  selectedImage === image
                    ? 'product-images__thumbnail-btn--active'
                    : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="product-images__thumbnail-img"
                />
              </button>
            ))}
          </div>

          <div className="product-images__main-container">
            <img
              src={selectedImage}
              alt={name}
              className="product-images__main"
            />
          </div>
        </>
      ) : (
        <div className="product-images__single-container">
          <img src={mainImage} alt={name} className="product-images__single" />
        </div>
      )}
    </div>
  );
};
