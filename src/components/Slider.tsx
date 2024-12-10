import { useEffect, useState } from 'react';
import { IMAGES_FOR_SLIDER } from '../utils/ImagesForSlider';
import classNames from 'classnames';

export const Slider = () => {
  const [slideId, setSlideId] = useState(0);

  const nextSlide = () => {
    setSlideId(slide => {
      if (slide === IMAGES_FOR_SLIDER.length - 1) {
        return 0;
      } else {
        return slide + 1;
      }
    });
  };

  const prevSlide = () => {
    setSlideId(slide => {
      if (slide === 0) {
        return IMAGES_FOR_SLIDER.length - 1;
      } else {
        return slide - 1;
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        col-[1/5] 
        mb-[56px] 
        mt-[24px] 
        sm:col-[1/13] 
        sm:mb-[64px]
        sm:mt-[32px]
        xl:col-[1/25] 
        xl:mb-[80px] 
        xl:mt-[56px]
      "
    >
      <div
        className="
        flex 
        h-[320xp] 
        gap-[16px] 
        sm:h-[189px]
        xl:h-[400px]
      "
      >
        <button className="slider-buttons" onClick={prevSlide}>
          <img
            src="./img/icons/Arrow_Left_Black.svg"
            alt="ArrowLeft"
            className="icons"
          />
        </button>

        <div className="flex overflow-hidden xl:rounded-[8px]">
          {IMAGES_FOR_SLIDER.map(img => (
            <img
              key={img.id}
              src={`${img.src}`}
              alt={`${img.alt}`}
              className="
                slider-images 
                transition-[translate] 
                duration-300 
                ease-in-out
              "
              style={{ translate: `${-100 * slideId}%` }}
            />
          ))}
        </div>

        <button className="slider-buttons" onClick={nextSlide}>
          <img
            src="./img/icons/Arrow_Right_Black.svg"
            alt="ArrowLeft"
            className="icons"
          />
        </button>
      </div>

      <div className="mt-[8px] flex h-[24px] justify-center gap-[4px]">
        {IMAGES_FOR_SLIDER.map(image => (
          <div
            key={image.id}
            className="slider-dots-content"
            onClick={() => setSlideId(image.id)}
          >
            <button
              className={classNames('slider-dots', {
                'bg-primary': slideId === image.id,
              })}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
