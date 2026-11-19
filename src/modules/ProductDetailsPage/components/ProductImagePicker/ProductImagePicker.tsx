import styles from './ProductImagePicker.module.scss';
interface ProductImagePickerProps {
  images: string[];
  selectedImage?: string;
  onSelect: (index: number) => void;
}

export const ProductImagePicker = ({
  images,
  selectedImage,
  onSelect,
}: ProductImagePickerProps) => {
  return (
    <div className={styles.picker}>
      <div className={styles.mainImage}>
        {selectedImage ? (
          <img src={selectedImage} alt="Product" />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.thumbs}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className={`${styles.thumb} ${src === selectedImage ? styles.active : ''}`}
            onClick={() => onSelect(index)}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};
