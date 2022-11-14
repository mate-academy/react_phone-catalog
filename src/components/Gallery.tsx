import { useState, useEffect } from 'react';

type Props = {
  photos: string[],
};

export const Gallery: React.FC<Props> = ({ photos }) => {
  const [activeImg, setActiveImg] = useState(photos[0]);

  useEffect(() => {
    setActiveImg(photos[0]);
  }, [photos]);

  return (
    <>
      <div className="product__img-list grid__item--1-2">
        {photos.map((photo, idx) => (
          <button
            type="button"
            key={JSON.stringify(new Date()) + idx.toString()}
            className="product__photo-link"
            onClick={(event) => {
              event.preventDefault();
              setActiveImg(photo);
            }}
          >
            <img
              src={photo}
              alt="img"
              className="product__small-img"
            />
          </button>
        ))}
      </div>
      <img
        src={activeImg}
        alt="img"
        className="product__img grid__item--3-12"
      />
    </>
  );
};
