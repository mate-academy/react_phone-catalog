import React, { useState } from 'react';

interface Props {
  originalImage: string;
  secondImage: string;
  name: string;
}

const ImgLoader: React.FC<Props> = ({ originalImage, secondImage, name }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <>
      {imageLoaded ? (
        <img
          src={originalImage}
          alt="Original Image"
          onError={handleImageError}
          className={name}
        />
      ) : (
        <img src={secondImage} alt="Placeholder Image" className={name} />
      )}
    </>
  );
};

export default ImgLoader;
