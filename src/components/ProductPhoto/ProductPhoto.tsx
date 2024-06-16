import React, { Fragment, useEffect, useState } from 'react';
import './ProductPhoto.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  productName: string;
};

export const ProductPhoto: React.FC<Props> = ({ images, productName }) => {
  const [pathMainImg, setPathMainImg] = useState(images[0]);

  useEffect(() => {
    setPathMainImg(images[0]);
  }, [images]);

  const exchangeImg = (image: string) => {
    setPathMainImg(image);
  };

  return (
    <section className="photos">
      <div className="photos__list">
        {images.map(image => (
          <Fragment key={image}>
            <input
              type="radio"
              id={image}
              data-img={image}
              name="photos-list"
              className="photos__input"
              checked={pathMainImg === image}
              onChange={() => exchangeImg(image)}
            />
            <label
              htmlFor={image}
              className={classNames('photos__label', {
                'photos__label--active': pathMainImg === image,
              })}
            >
              <img
                src={`./api/${image}`}
                alt={`${productName}`}
                className="photos__img"
              />
            </label>
          </Fragment>
        ))}
      </div>
      <div className="photos__main">
        <img
          src={`./api/${pathMainImg}`}
          alt="big"
          className="photos__main-img"
        />
      </div>
    </section>
  );
};
