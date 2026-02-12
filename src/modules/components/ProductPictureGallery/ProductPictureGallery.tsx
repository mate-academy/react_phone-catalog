import classNames from 'classnames';
import styles from './ProductPictureGallery.module.scss';

type Prosp = {
  images: string[];
  mainImageIndex: number;
  setMainImage: (index: number) => void;
};

export const ProductPictureGallery: React.FC<Prosp> = ({
  images,
  mainImageIndex,
  setMainImage,
}) => {
  return (
    <div className={styles.picture__gallery}>
      <div className={styles['picture__gallery--main']}>
        <img
          className={styles.picture__gallery__image}
          src={images[mainImageIndex]}
          alt={`Pictur-main-${mainImageIndex}`}
        />
      </div>
      <div className={styles.picture__gallery__pagination}>
        {images.map((src, index) => (
          <div
            key={index}
            className={classNames(
              styles['picture__gallery__pagination--item'],
              {
                [styles['picture__gallery__pagination--item--active']]:
                  mainImageIndex === index,
              },
            )}
            onClick={() => setMainImage(index)}
          >
            <img
              className={styles['picture__gallery__pagination--image']}
              src={src}
              alt={`Picture-pagination-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
