import { FC, useState } from 'react';
import classNames from 'classnames';
import '../styles/homeImages.scss';
import { Link } from 'react-router-dom';

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
          {activeImage === 0 && (
            <Link to="/phones" className="banner__item">
              <img
                src="./img/newBanners/banner1.png"
                alt="phones"
                className={classNames(
                  'banner__img', { 'banner__img--active': activeImage === 0 },
                )}
              />
            </Link>
          )}
          {activeImage === 1 && (
            <Link to="/tablets" className="banner__item">
              <img
                src="./img/newBanners/banner2.png"
                alt="tablets"
                className={classNames(
                  'banner__img', { 'banner__img--active': activeImage === 1 },
                )}
              />
            </Link>
          )}
          {activeImage === 2 && (
            <Link to="/accessories" className="banner__item">
              <img
                src="./img/newBanners/banner3.png"
                alt="accessories"
                className={classNames(
                  'banner__img', { 'banner__img--active': activeImage === 2 },
                )}
              />
            </Link>
          )}
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
          { }
        </button>
        <button
          type="button"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeImage === 1 },
          )}
          onClick={() => setActiveImage(1)}
        >
          { }
        </button>
        <button
          type="button"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeImage === 2 },
          )}
          onClick={() => setActiveImage(2)}
        >
          { }
        </button>
      </div>
    </div>

  );
};
