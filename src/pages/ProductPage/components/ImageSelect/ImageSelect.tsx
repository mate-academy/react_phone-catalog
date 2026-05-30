//hooks
import { useEffect, useState } from 'react';

//styles
import styles from './ImageSelect.module.scss';

//services
import classNames from 'classnames';

type Props = {
  images: string[];
};

export const ImageSelect: React.FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState<string>(images[0]);

  useEffect(() => {
    setSelected(images[0]);
  }, [images]);

  return (
    <div className={styles.imageSelect}>
      <div className={styles.imageWrapper}>
        <img
          src={selected}
          alt="product-main-image"
          className={classNames(styles.image, styles.imageMain)}
        />
      </div>

      <div className={styles.selector}>
        {images.map(el => {
          return (
            <img
              src={el}
              alt="productIamge"
              key={el}
              onClick={() => setSelected(el)}
              className={classNames(styles.image, {
                [styles.imageSelected]: el === selected,
              })}
            />
          );
        })}
      </div>
    </div>
  );
};
