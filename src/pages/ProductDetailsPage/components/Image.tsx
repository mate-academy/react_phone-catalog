import React, { useState } from 'react';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('details__img--img', {
    'details__img--img-active': isActive,
  });

const Image: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(
    './img/phones/apple-iphone-11-pro/gold/00.webp',
  );

  const changeImage = (newImage: string) => {
    setCurrentImage(newImage);
  };

  return (
    <>
      <img src={currentImage} alt="apple" className="details__img" />

      <div className="details__block">
        <img
          src="./img/phones/apple-iphone-11-pro/gold/01.webp"
          alt="apple"
          className={getLinkClass({
            isActive:
              currentImage === './img/phones/apple-iphone-11-pro/gold/01.webp',
          })}
          onClick={() =>
            changeImage('./img/phones/apple-iphone-11-pro/gold/01.webp')
          }
        />

        <img
          src="./img/phones/apple-iphone-11-pro/gold/02.webp"
          alt="apple"
          className={getLinkClass({
            isActive:
              currentImage === './img/phones/apple-iphone-11-pro/gold/02.webp',
          })}
          onClick={() =>
            changeImage('./img/phones/apple-iphone-11-pro/gold/02.webp')
          }
        />

        <img
          src="./img/phones/apple-iphone-11-pro/gold/02.webp"
          alt="apple"
          className={getLinkClass({
            isActive:
              currentImage === './img/phones/apple-iphone-11-pro/gold/02.webp',
          })}
          onClick={() =>
            changeImage('./img/phones/apple-iphone-11-pro/gold/02.webp')
          }
        />

        <img
          src="./img/phones/apple-iphone-11-pro/gold/00.webp"
          alt="apple"
          className={getLinkClass({
            isActive:
              currentImage === './img/phones/apple-iphone-11-pro/gold/00.webp',
          })}
          onClick={() =>
            changeImage('./img/phones/apple-iphone-11-pro/gold/00.webp')
          }
        />

        <img
          src="./img/phones/apple-iphone-11-pro/gold/00.webp"
          alt="apple"
          className={getLinkClass({
            isActive:
              currentImage === './img/phones/apple-iphone-11-pro/gold/00.webp',
          })}
          onClick={() =>
            changeImage('./img/phones/apple-iphone-11-pro/gold/00.webp')
          }
        />
      </div>
    </>
  );
};

export default Image;
