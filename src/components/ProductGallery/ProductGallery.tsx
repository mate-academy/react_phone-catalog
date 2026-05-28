import classNames from 'classnames';
import styles from './ProductGallery.module.scss';
import { TypesOfProducts } from '../../types/TypesOfProducts';

type Props = {
  currentProduct: TypesOfProducts;
  currentImage: string;
  setCurrentImage: (img: string) => void;
};

export const ProductGallery: React.FC<Props> = ({
  currentImage,
  currentProduct,
  setCurrentImage,
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.bigImagesContainer}>
        <img
          src={currentImage}
          alt={currentProduct?.name}
          className={styles.bigImage}
        />
      </div>
      <div className={styles.imagesContainer}>
        {currentProduct?.images.map(picture => {
          return (
            <img
              src={picture}
              alt={picture}
              key={picture}
              className={classNames(styles.img, {
                [styles.active]: picture === currentImage,
              })}
              onClick={() => {
                setCurrentImage(picture);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;
