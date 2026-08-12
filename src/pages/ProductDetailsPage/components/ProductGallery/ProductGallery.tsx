import type { ProductDetailsFromServer } from '../../../../types/product';
import styles from '../../ProductDetailsPage.module.scss';

type Props = {
  product: ProductDetailsFromServer;
  visibleImage: string;
  onImageChange: (image: string) => void;
};

export const ProductGallery = ({
  product,
  visibleImage,
  onImageChange,
}: Props) => {
  const activeImageSrc = `${import.meta.env.BASE_URL}${visibleImage}`;

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {product.images.map(image => {
          const imageSrc = `${import.meta.env.BASE_URL}${image}`;

          return (
            <button
              className={
                image === visibleImage
                  ? `${styles.thumb} ${styles.thumbActive}`
                  : styles.thumb
              }
              type="button"
              key={image}
              onClick={() => onImageChange(image)}
            >
              <img
                className={styles.thumbImage}
                src={imageSrc}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </button>
          );
        })}
      </div>

      <div className={styles.imageWrapper}>
        <img
          className={styles.mainImage}
          src={activeImageSrc}
          alt={product.name}
          decoding="async"
        />
      </div>
    </div>
  );
};
