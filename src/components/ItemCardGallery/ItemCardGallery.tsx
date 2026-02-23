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
              src={`/${image}`}
              className={styles.itemCardImg__gallery_thumb_img}
              alt={`${image} view ${index + 1}`}
            />
          </button>
        ))}
      </div>

      <div className={styles.itemCardImg__gallery_main}>
        <div className={styles.itemCardImg__gallery_main_inner}>
          <img
            src={`/${productImg[selectedImage]}`}
            className={styles.itemCardImg__gallery_main_img}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCardGallery;
