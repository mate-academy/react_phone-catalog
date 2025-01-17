import React, { useState, useEffect } from 'react';
import styles from './ProductImagesSwiper.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { Loader } from '../Loader';
import { ProductNotFoundPage } from '../../modules/ProductNotFoundPage';

type Props = {
  selectedProduct?: ProductDetails | null;
};

const ProductImagesSwiper: React.FC<Props> = ({ selectedProduct }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setActiveImage(selectedProduct.images[0]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [selectedProduct]);

  const handleImageClick = (imageLink: string) => {
    setActiveImage(imageLink);

    // Start the rotation animation
    setRotation({ x: 90, y: 360, z: 360 });
    setIsAnimating(true);

    // Reset the rotation to the original position after the animation
    setTimeout(() => {
      setRotation({ x: 0, y: 0, z: 0 });
      setIsAnimating(false);
    }, 1600); // Matches the transition duration
  };

  if (isLoading) {
    return <Loader />;
  }

  if (
    !selectedProduct ||
    !selectedProduct.images ||
    selectedProduct.images.length === 0
  ) {
    return <ProductNotFoundPage />;
  }

  const swiperSlideSet = selectedProduct.images.map((imageLink: string) => (
    <div
      key={imageLink}
      onClick={() => handleImageClick(imageLink)}
      className={`${styles.thumbnailImage} ${
        activeImage === imageLink ? styles.activeThumbnailBorder : ''
      }`}
    >
      <img
        src={imageLink}
        alt={selectedProduct?.namespaceId}
        className={styles.thumbnail}
      />
    </div>
  ));

  return (
    <div className={styles.ItemPhoto_container}>
      <div className={styles.ItemPhoto_thumbs}>{swiperSlideSet}</div>

      <div className={styles.ItemPhoto_main}>
        {activeImage && (
          <img
            src={activeImage}
            alt={selectedProduct?.namespaceId}
            className={styles.mainImage}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              transition: isAnimating
                ? 'transform 2.9s ease-in-out'
                : 'transform 1.6s ease-in-out',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductImagesSwiper;
