import styles from './ProductPreview.module.scss';

type ProductPreviewProps = {
  images: string[];
  selectedImage: string | null;
  setSelectedImage: (val: string | null) => void;
};

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  images,
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <div className={styles.preview}>
      <div className={styles.preview_main}>
        <img
          className={styles.preview_image}
          src={selectedImage ? selectedImage : images[0]}
          alt="main"
        />
      </div>
      <ul className={styles.preview_list}>
        {images.map((product, index) => (
          <li key={index} className={styles.preview_li}>
            <img
              className={`${styles.preview_miniImage} ${selectedImage === product ? styles.preview_miniImage_active : ''}`}
              src={product}
              alt={`mini image - ${index}`}
              onClick={() => setSelectedImage(product)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
