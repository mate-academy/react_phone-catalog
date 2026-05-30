import { useEffect, useState } from 'react';
import styles from './Gallery.module.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
};

export const Gallery: React.FC<Props> = ({ images }) => {
  const [curImg, setCurImg] = useState(images[0]);

  const changeCurImg = (src: string) => {
    setCurImg(src);
  };

  useEffect(() => {
    setCurImg(images[0]);
  }, [images]);

  return (
    <div className={styles.Gallery}>
      <ul className={styles.Gallery__list}>
        {images.map(img => (
          <li
            key={img}
            className={classNames(styles.Gallery__item, {
              [styles.Gallery__item_active]: curImg === img,
            })}
            onClick={() => changeCurImg(img)}
          >
            <img src={img} alt={img.split('/')[2]} />
          </li>
        ))}
      </ul>
      <div className={styles.Gallery__img}>
        <img src={curImg} alt={curImg.split('/')[2]} />
      </div>
    </div>
  );
};
