import { FC, useState } from 'react';
import classNames from 'classnames';
import '../styles/homeImages.scss';

export const HomeImages: FC = () => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="banner container">
      <div className="banner__content">
        <button
          type="button"
          className="banner__button banner__button--left"
          onClick={() => (
            activeImage === 0
              ? setActiveImage(2)
              : setActiveImage(activeImage - 1)
          )}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <div className="banner__image">
          <img
            src="./img/newBanners/banner1.png"
            alt="Banner-1"
            className={classNames(
              'banner__img', { 'banner__img--active': activeImage === 0 },
            )}
          />
          <img
            src="./img/newBanners/banner2.png"
            alt="Banner-2"
            className={classNames(
              'banner__img', { 'banner__img--active': activeImage === 1 },
            )}
          />
          <img
            src="./img/newBanners/banner3.png"
            alt="Banner-3"
            className={classNames(
              'banner__img', { 'banner__img--active': activeImage === 2 },
            )}
          />
        </div>
        <button
          type="button"
          className="banner__button banner__button--right"
          onClick={() => (
            activeImage === 2
              ? setActiveImage(0)
              : setActiveImage(activeImage + 1)
          )}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
      <div className="banner__pagination">
        <button
          type="button"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeImage === 0 },
          )}
          onClick={() => setActiveImage(0)}
        >
          {}
        </button>
        <button
          type="button"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeImage === 1 },
          )}
          onClick={() => setActiveImage(1)}
        >
          {}
        </button>
        <button
          type="button"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeImage === 2 },
          )}
          onClick={() => setActiveImage(2)}
        >
          {}
        </button>
      </div>
    </div>

  );
};
