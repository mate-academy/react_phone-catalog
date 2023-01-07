import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';
import './Gallery.scss';

type Props = {
  selectedProductDetails: ProdcutDetails,
};

export const Gallery: FC<Props> = ({ selectedProductDetails }) => {
  const { images } = selectedProductDetails;
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [selectedProductDetails]);

  return (
    <section className="gallery">
      <div className="gallery--left">
        {images.map(image => {
          return (
            <button
              key={image}
              className={classNames(
                'gallery__item',
                { 'gallery__item--selected': image === selectedImage },
              )}
              type="button"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`../${image}`}
                alt="phone"
                className="gallery--left__img"
              />
            </button>
          );
        })}
      </div>

      <div className="gallery__large">
        <img
          src={`../${selectedImage}`}
          alt="phone"
          className="gallery__item--large"
        />
      </div>
    </section>
  );
};
