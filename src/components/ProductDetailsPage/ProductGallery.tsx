import { assetUrl } from '../../utils/assets';
import styles from './ProductDetailsPage.module.scss';

interface Props {
  name: string;
  images: string[];
  imageIndex: number;
  onSelectImage: (index: number) => void;
  onImageError: (image: string) => void;
}

export const ProductGallery = ({
  name,
  images,
  imageIndex,
  onSelectImage,
  onImageError,
}: Props) => (
  <div className={styles.gallery}>
    <div className={styles.thumbnails} aria-label="Product pictures">
      {images.map((image, index) => (
        <button
          key={image}
          type="button"
          className={`${styles.thumbnail} ${
            imageIndex === index ? styles.selectedThumbnail : ''
          }`}
          aria-label={`View picture ${index + 1} of ${name}`}
          aria-pressed={imageIndex === index}
          onClick={() => onSelectImage(index)}
        >
          <img
            src={assetUrl(image)}
            alt=""
            onError={() => onImageError(image)}
          />
        </button>
      ))}
    </div>
    <div className={styles.mainImage}>
      <img
        src={assetUrl(images[imageIndex])}
        alt={`${name}, view ${imageIndex + 1}`}
        onError={() => onImageError(images[imageIndex])}
      />
    </div>
  </div>
);
