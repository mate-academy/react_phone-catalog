import React, { useState } from 'react';

/* eslint-disable-next-line */
const PhoneDetais = ({phone, onAddToBasket}) => {
  const {
    id, name, images, description,
  } = phone;

  const [mainImage, setMainImage] = useState(images[0]);
  const changeMainImage = (image) => {
    setMainImage(image);
  };

  return (
    <>
      <div className="section__main-content">
        <div className="section__image">
          <img
            key={mainImage}
            alt={name}
            /* eslint-disable-next-line max-len */
            src={`https://mate-academy.github.io/phone-catalogue-static/${mainImage}`}
          />
        </div>
        <div className="section__content">
          <h2 className="indent-mb-m">{name}</h2>
          <p className="indent-mb-l">{description}</p>
          <div className="card__button">
            <button
              type="button"
              onClick={() => onAddToBasket(id, name)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div
        className="section__gallery gallery"
      >
        {images.map((image, idx) => (
          /* eslint-disable-next-line */
          <div
            key={image}
            className="gallery__image"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* eslint-disable-next-line */}
            <img
              onClick={() => changeMainImage(image)}
              alt={name}
              /* eslint-disable-next-line max-len */
              src={`https://mate-academy.github.io/phone-catalogue-static/${image}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PhoneDetais;
