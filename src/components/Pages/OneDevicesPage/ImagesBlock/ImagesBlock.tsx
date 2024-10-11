import React from 'react';
import './ImagesBlock.scss';

type Props = {
  images: string[];
};

export const ImagesBlock: React.FC<Props> = ({ images }) => {

  return (
    <div className="images">
      <div className="images__conteiner">
        {images.map(image => (
          <img
            key={image}
            className="img images__small"
            src={`/react_phone-catalog/${image}`}
            alt={image}
          />
        ))}
      </div>
      <img className="img images__main" src={`/react_phone-catalog/${images[0]}`} alt={images[0]} />
    </div>
  );
};
