import classNames from 'classnames';
import styles from './Galerry.styles.module.scss';

type Props = {
  images: string[];
  productName: string;
  selectedImage: number;
  onSelectImage: (index: number) => void;
};

export const Gallery: React.FC<Props> = ({
  images,
  productName,
  selectedImage,
  onSelectImage,
}) => {
  return (
    <>
      <div className={styles.productGallery}>
        <div className={styles.gallery}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={productName}
              onClick={() => onSelectImage(index)}
              className={classNames(styles.thumbnail, {
                [styles.active]: selectedImage === index,
              })}
            />
          ))}
        </div>

        <div className={styles.mainImage}>
          <img
            className={styles.image}
            src={images[selectedImage]}
            alt={productName}
          />
        </div>
      </div>
    </>
  );
};
