import { useContext, useEffect, useState } from 'react';
import styles from './ImagesBlock.module.scss';
import { AppContext } from '../../../../utils/AppContext';
import classNames from 'classnames';

type Props = {
  images: string[];
};

export const ImagesBlock: React.FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const { isDarkTheme } = useContext(AppContext);

  useEffect(() => setCurrentImage(images[0]), [images]);

  return (
    <div className={styles.container}>
      <div className={styles.current}>
        <img src={currentImage} className={styles.current__image} />
      </div>

      <div className={styles.images}>
        {images.map((image, index) => {
          return (
            <div
              className={classNames(
                styles.images__container,
                isDarkTheme ? styles.images__containerDark : '',
              )}
              key={index}
            >
              <img
                className={styles.images__preview}
                src={image}
                onClick={() => setCurrentImage(image)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
