import { useState } from 'react';
import styles from './ItemCardGallery.module.scss';

const ItemCardGallery = ({ productImg }: { productImg: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={styles.itemCardImg}>
      <div className={styles.itemCardImg__gallery_thumbs}>
        {productImg.map((image, index) => (
          <button
            key={index}
            className={`${styles.itemCardImg__gallery_thumb} ${
              selectedImage === index
                ? styles.itemCardImg__gallery_thumb_active
                : ''
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={`${import.meta.env.BASE_URL}${image}`}
              alt={`${image} view ${index + 1}`}
              className={styles.itemCardImg__gallery_thumb_img}
            />
          </button>
        ))}
      </div>

      <div className={styles.itemCardImg__gallery_main}>
        <div className={styles.itemCardImg__gallery_main_inner}>
          <img
            src={`${import.meta.env.BASE_URL}${productImg[selectedImage]}`}
            alt={`${productImg[selectedImage]} view ${selectedImage + 1}`}
            className={styles.itemCardImg__gallery_main_img}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCardGallery;
