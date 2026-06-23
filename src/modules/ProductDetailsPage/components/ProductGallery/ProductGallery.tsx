import classNames from 'classnames';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  activeImage: string;
  onImageChange: (image: string) => void;
}

export const ProductGallery = ({
  images,
  activeImage,
  onImageChange,
}: Props) => (
  <div className={styles.gallery}>
    <div className={styles.thumbs}>
      {images.map(image => (
        <button
          key={image}
          type="button"
          className={classNames(styles.thumb, {
            [styles.thumbActive]: image === activeImage,
          })}
          onClick={() => onImageChange(image)}
        >
          <img src={`/${image}`} alt="" className={styles.thumbImage} />
        </button>
      ))}
    </div>

    <div className={styles.frame}>
      <img src={`/${activeImage}`} alt="" className={styles.image} />
    </div>
  </div>
);
