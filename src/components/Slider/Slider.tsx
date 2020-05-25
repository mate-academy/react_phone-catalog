import React, { useState } from 'react';
import { sliderImages } from '../../helpers/constants';

export const Slider: React.FC = () => {
  const images = sliderImages.map((image, index) => ({
    ...image,
    position: index + 1,
  }));

  const [position, setPosition] = useState(1);
  const [left, setLeft] = useState(0);
  let imgWidth = 1040;

  const handleLeftClick = (path: number) => {
    const newLeftPosition = (imgWidth) * -path;

    setPosition(position + path);
    setLeft(left + newLeftPosition);
  };

  const handleRightClick = () => {

  }


  return (
    <section className="slider">
      <div className="slider__container">
        <button
          type="button"
          className="slider__button"
          onClick={() => handleLeftClick(1)}
          >
          <span className="slider__img--arrow-left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.52876
                3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716
                7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157
                12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841
                12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876
                4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                fill="#B4BDC4"/>
              </svg>
          </span>
        </button>
        <div className="slider__img-container slider__img">
          <ul
            className="slider__img-list"
            style={{
              transform: `translateX(${left}px)`,
            }}
          >
            {images.map(image => (
              <li
                className="slider__img-item"
                key={image.position}
              >
                <img
                  src={image.path}
                  alt={image.alt}
                  className="slider__img-visible"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="slider__button"
          onClick={() => handleRightClick()}
          >
          <span className="slider__img--arrow-right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4715
                3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868
                7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868
                12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318
                12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715
                4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                fill="#B4BDC4"/>
              </svg>
          </span>
        </button>
      </div>
    </section>
  );
};


/*<button
type="button"
className="slider__button"
onClick={() => handleClick(-1)}
   <div className="slider__img Banner__Image--arrow-left"></div>
        </button>

<button
type="button"
className="Banner__Button"
onClick={() => handleClick(1)}
>
<div className="Banner__Image Banner__Image--arrow-right" />
</button>
</div>
<div className="Banner__Position-container">
{BannerImage.map(image => (
<span
  key={image.position}
  className={cn({
    Banner__Position: true,
    'Banner__Position--active': image.position === currentPosition,
  })}
  onClick={() => handleChooseImage(image.position)}
/>
))}
</div>
>*/
