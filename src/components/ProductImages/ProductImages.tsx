import React, { useState, useEffect } from 'react';
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
  // Add a random query parameter to force browser to reload the image
  const getImageUrl = (url: string) => {
    // Add a cache-busting parameter to force the browser to reload the image
    return `${url}?t=${new Date().getTime()}`;
  };

  const [selectedImage, setSelectedImage] = useState(mainImage);
  const hasGallery = isDetailsView && galleryImages && galleryImages.length > 0;

  // Update selectedImage when mainImage changes
  useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage]);

  return (
    <div className="product-images">
      {hasGallery ? (
        <>
          <div className="product-images__thumbnails">
            {galleryImages.map((image, index) => (
              <button
                key={`thumb-${index}-${image}`}
                className={`product-images__thumbnail-btn ${
                  selectedImage === image
                    ? 'product-images__thumbnail-btn--active'
                    : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="product-images__thumbnail-img"
                />
              </button>
            ))}
          </div>

          <div className="product-images__main-container">
            <img
              src={getImageUrl(selectedImage)}
              alt={name}
              className="product-images__main"
            />
          </div>
        </>
      ) : (
        <div className="product-images__single-container">
          <img
            src={getImageUrl(selectedImage)}
            alt={name}
            className="product-images__single"
            key={`img-${mainImage}-${new Date().getTime()}`}
          />
        </div>
      )}
    </div>
  );
};
