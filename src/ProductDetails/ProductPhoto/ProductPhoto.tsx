import { useEffect, useState } from 'react';
import style from './ProductPhoto.module.scss';
import classNames from 'classnames';

interface Props {
  photos: string[];
}

export const ProductPhoto: React.FC<Props> = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(photos[0]);

  useEffect(() => {
    setCurrentImage(photos[0]);
  }, [photos]);

  return (
    <div className={style['product-photo']}>
      <div className={style['product-photo__count']}>
        <img
          src={currentImage}
          className={style['product-photo__image']}
          alt="image"
        />
      </div>

      <ul className={style['product-photo__list']}>
        {photos.map((img, index) => {
          return (
            <li
              className={style['product-photo__item']}
              key={index}
              onClick={() => setCurrentImage(img)}
            >
              <button
                className={classNames(style['product-photo__button'], {
                  [style['product-photo__button--active']]:
                    img === currentImage,
                })}
              >
                <img
                  src={img}
                  alt="image"
                  className={style['product-photo__image']}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
