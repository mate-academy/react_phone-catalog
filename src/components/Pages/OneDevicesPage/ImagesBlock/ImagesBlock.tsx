import React from 'react';
import './ImagesBlock.scss';

type Props = {
  images: string[];
};

export const ImagesBlock: React.FC<Props> = ({ images }) => {
  const imagesPath = images.map(image => `../../../../${image}`);

  return (
    <div className="images">
      <div className="images__conteiner">
        {imagesPath.map(imagePath => (
          <img
            key={imagePath}
            className="img images__small"
            src={imagePath}
            alt={imagePath}
          />
        ))}
      </div>
      <img className="img images__main" src={imagesPath[0]} alt={images[0]} />
    </div>
  );
};
