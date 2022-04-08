import { FunctionComponent, useState, useEffect } from 'react';
import classNames from 'classnames';

// Styles
import './Images.scss';

type Props = {
  images: string[];
};

export const Images: FunctionComponent<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className="Images">
      <ul>
        {images.map(image => (
          <li key={image} className="Images__listItem">
            <button
              type="button"
              className={classNames('Images__button', {
                'Images__button--selected': selectedImage === image,
              })}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt="Gadget"
                className="Images__image"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="Images__mainImageContainer">
        <img
          src={selectedImage}
          alt="Gadget"
          className="Images__image"
        />
      </div>
    </div>
  );
};
