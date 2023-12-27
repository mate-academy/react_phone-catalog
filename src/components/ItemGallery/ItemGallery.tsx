import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './ItemGallery.scss';

type Props = {
  images: string[]
};

export const ItemGallery: React.FC<Props> = ({ images }) => {
  const [imgSrc, setImgSrc] = useState(images[0]);

  useEffect(() => {
    setImgSrc(images[0]);
  }, [images]);

  return (
    <div className="item-gallery">
      <ul className="item-gallery__list">
        {images.map(imgUrl => (
          <li key={imgUrl} className="item-gallery__li">
            <button
              type="button"
              onClick={() => setImgSrc(imgUrl)}
              className={classNames(
                'item-gallery__previw-btn',
                { 'item-gallery__previw-btn--active': imgUrl === imgSrc },
              )}
            >
              <img
                src={imgUrl}
                alt="product"
                className="item-gallery__previw-img"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="item-gallery__img-container">
        <img
          src={imgSrc}
          alt="product"
          className="item-gallery__img"
        />
      </div>
    </div>
  );
};
