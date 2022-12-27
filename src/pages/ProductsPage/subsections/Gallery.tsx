import classNames from 'classnames';
import { FC, useState } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';

type Props = {
  selectedProductDetails: ProdcutDetails,
};

export const Gallery: FC<Props> = ({ selectedProductDetails }) => {
  const { images } = selectedProductDetails;
  const imagesEndPoint = images
    .map((img: string) => img.split('/').at(-1));
  const [selectedImage, setSelectedImage] = useState(imagesEndPoint[0]);

  return (
    <section className="gallery">
      <div className="gallery--left">
        {imagesEndPoint.map(image => {
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
                src={`/assets/phones/${image}`}
                alt="phone"
                className="gallery--left__img"
              />
            </button>
          );
        })}
      </div>

      <div className="gallery__large">
        <img
          src={`/assets/phones/${selectedImage}`}
          alt="phone"
          className="gallery__item--large"
        />
      </div>
    </section>
  );
};
