import React, { useEffect, useState } from 'react';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('details__img--img', {
    'details__img--img-active': isActive,
  });

type Props = {
  src: string[];
};

const Image: React.FC<Props> = ({ src }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (src && src.length > 0) {
      setCurrentImage(src[0]);
    }
  }, [src]);

  const changeImage = (newImage: string) => {
    setCurrentImage(newImage);
  };

  return (
    <>
      {currentImage && (
        <img src={currentImage} alt="apple" className="details__img" />
      )}

      <div className="details__block">
        {src.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              alt="apple"
              className={getLinkClass({
                isActive: currentImage === image,
              })}
              onClick={() => changeImage(image)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Image;
