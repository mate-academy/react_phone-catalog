import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[] | string;
  name: string;
  category?: string;
}

export const ProductGallery: React.FC<Props> = ({ images, name, category }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // check if an image exists
  const checkImageExists = useCallback((url: string): Promise<boolean> => {
    return new Promise(resolve => {
      const img = new Image();

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }, []);

  // Find all available images for a product
  const findAllAvailableImages = useCallback(
    async (baseImagePath: string) => {
      const existingImages: string[] = [];
      const baseDir = baseImagePath.substring(
        0,
        baseImagePath.lastIndexOf('/') + 1,
      );

      // Check images(max reasonable number)
      for (let i = 0; i <= 10; i++) {
        const number = i.toString().padStart(2, '0');
        const imagePath = `${baseDir}${number}.webp`;

        const exists = await checkImageExists(imagePath);

        if (exists) {
          existingImages.push(imagePath);
        } else if (i > 0) {
          break;
        }
      }

      return existingImages;
    },
    [checkImageExists],
  );

  useEffect(() => {
    const loadAvailableImages = async () => {
      setLoading(true);

      let imagesArray: string[] = [];

      if (Array.isArray(images)) {
        imagesArray = images;
      } else if (typeof images === 'string') {
        imagesArray = [images];
      }

      if (imagesArray.length > 0 && imagesArray[0]) {
        const foundImages = await findAllAvailableImages(imagesArray[0]);

        setAvailableImages(foundImages);
      } else {
        // Fallback - if no images available
        const detectedCategory =
          category ||
          (name.toLowerCase().includes('phone')
            ? 'phones'
            : name.toLowerCase().includes('tablet')
              ? 'tablets'
              : name.toLowerCase().includes('watch')
                ? 'accessories'
                : 'phones');

        setAvailableImages([`img/${detectedCategory}1.png`]);
      }

      setLoading(false);
    };

    loadAvailableImages();
  }, [images, name, category, findAllAvailableImages]);

  // Function to handle image loading errors
  const handleImageError = useCallback((detectedCategory: string) => {
    return (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = event.target as HTMLImageElement;

      target.src = `img/${detectedCategory}1.png`;
    };
  }, []);

  // Determine category for fallback images
  const detectedCategory =
    category ||
    (name.toLowerCase().includes('phone')
      ? 'phones'
      : name.toLowerCase().includes('tablet')
        ? 'tablets'
        : name.toLowerCase().includes('watch')
          ? 'accessories'
          : 'phones');

  if (loading) {
    return (
      <div className={styles.gallery}>
        <div className={styles.gallery__loading}>Loading images...</div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {/* Thumbnails - dynamic count based on available images */}
      {availableImages.length > 1 && (
        <div className={styles.gallery__thumbnails}>
          {availableImages.map((image, index) => (
            <button
              key={index}
              className={classNames(styles.gallery__thumbnail, {
                [styles.gallery__thumbnail_active]: index === selectedImage,
              })}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${name} view ${index + 1}`}
                className={styles.gallery__thumbnailImage}
                onError={handleImageError(detectedCategory)}
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className={styles.gallery__main}>
        <img
          src={availableImages[selectedImage]}
          alt={`${name} main view`}
          className={styles.gallery__mainImage}
          onError={handleImageError(detectedCategory)}
        />
      </div>
    </div>
  );
};
