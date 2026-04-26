import styles from './ProductGallery.module.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  productName: string;
  mainImage: string;
  onImageSelect: (image: string) => void;
};

export const ProductGallery: React.FC<Props> = ({
  images,
  productName,
  mainImage,
  onImageSelect,
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__thumbnails}>
        {images.map(img => {
          const imageSrc = `/${img}`;
          const isActive = mainImage === imageSrc;

          return (
            <button
              key={img}
              type="button"
              className={classNames(styles.gallery__thumbnailButton, {
                [styles.gallery__thumbnailButtonActive]: isActive,
              })}
              onClick={() => onImageSelect(imageSrc)}
            >
              <img
                src={imageSrc}
                alt={productName}
                className={styles.gallery__thumbnailImage}
              />
            </button>
          );
        })}
      </div>
      <div className={styles.gallery__main}>
        <img
          src={mainImage}
          alt={productName}
          className={styles.gallery__mainImage}
        />
      </div>
    </div>
  );
};
