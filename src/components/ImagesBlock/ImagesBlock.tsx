import { useEffect, useState } from 'react';
import { ProductData } from '../../types/ProductData';
import styles from './ImagesBlock.module.scss';
import classNames from 'classnames';

type Props = {
  product: ProductData;
  classNameProp: string;
};

export const ImagesBlock: React.FC<Props> = ({ product, classNameProp }) => {
  const [mainImage, setMainImage] = useState<string>('');

  const { images, name } = product;

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  const chooseMainImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className={classNames(styles['images-block'], classNameProp)}>
      <div className={styles['images-block__main']}>
        <img className={styles.img} src={mainImage} alt={`${name}-main`} />
      </div>

      <div
        className={classNames(
          styles['images-block__thumbnail'],
          styles.thumbnail,
        )}
      >
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={classNames(styles.thumbnail__image, {
                [styles['thumbnail__image--active']]: image === mainImage,
              })}
              onClick={() => chooseMainImage(image)}
            >
              <img
                src={image}
                alt={`${name}-${index}`}
                className={styles.img}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
