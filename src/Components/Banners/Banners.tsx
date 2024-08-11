import { useState } from 'react';
import './banners.scss';
import classNames from 'classnames';
import { Button } from '../types/Button';

const bannerPhotos = [
  { id: 1, class: 'banners__photo--PHONES' },
  { id: 2, class: 'banners__photo--TABLETS' },
  { id: 3, class: 'banners__photo--ACCESSORIES' },
];

const bannerButtons = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: false },
];

export const Banners = () => {
  const [buttons, setButtons] = useState<Button[]>(bannerButtons);
  const [slide, setSlide] = useState(0);
  // const [slidedPhoto, setSlidedPhoto] = useState(1);

  const handleActiveButton = (selectedButton: number) => {
    const toggleButton = buttons.map(button => {
      if (button.id === selectedButton) {
        setSlide(button.id * -350 + 350);

        return {
          ...button,
          active: true,
        };
      } else {
        return {
          ...button,
          active: false,
        };
      }
    });

    setButtons(toggleButton);
  };

  const handleClickingSlides = () => {
    if (slide > -700) {
      setSlide(slide - 350);
    } else {
      setSlide(0);
    }
  };

  return (
    <div>
      <div
        className="banners__photos"
        style={{ transform: `translateX(${slide.toString()}px)` }}
      >
        {bannerPhotos.map(banner => (
          <div
            key={banner.id}
            className={`banners__photo ${banner.class}`}
            onClick={handleClickingSlides}
          ></div>
        ))}
      </div>
      <div className="banners__buttons">
        {buttons.map(button => {
          return (
            <a
              onClick={() => handleActiveButton(button.id)}
              key={button.id}
              className={classNames('banners__button', {
                'banners__button--is-active': button.active,
              })}
            ></a>
          );
        })}
      </div>
    </div>
  );
};
