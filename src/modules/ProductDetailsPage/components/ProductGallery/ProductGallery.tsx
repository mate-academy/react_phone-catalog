import classNames from 'classnames';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const ProductGallery: React.FC<Props> = ({
  images,
  selectedIndex,
  onSelect,
}) => (
  <div className={styles.gallery}>
    <div className={styles.preview}>
      <img src={`/${images[selectedIndex]}`} alt="Selected product" />
    </div>
    <div className={styles.thumbs}>
      {images.map((image, index) => (
        <button
          type="button"
          key={image}
          className={classNames(styles.thumb, {
            [styles.active]: index === selectedIndex,
          })}
          onClick={() => onSelect(index)}
        >
          <img src={`/${image}`} alt={`Preview ${index + 1}`} />
        </button>
      ))}
    </div>
  </div>
);
