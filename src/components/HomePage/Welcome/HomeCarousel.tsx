import { useEffect, useState } from 'react';
import column from '../../grid.module.scss';
import style from './homeface.module.scss';
import classNames from 'classnames';

const slideImage = [
  { id: 0, src: 'img/banner.png' },
  { id: 1, src: 'img/banner-phones.png' },
  { id: 2, src: 'img/banner-accessories.png' },
  { id: 3, src: 'img/banner-tablets.png' },
];

export const HomeCarousel = () => {
  const [active, setActive] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % slideImage.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [active]);

  const handleClick = (scale: number) => {
    const totalSlides = slideImage.length;
    const nextSlide = (active + scale + totalSlides) % totalSlides;

    setPreviousSlide(active);
    setActive(nextSlide);
  };

  return (
    <>
      <a
        href="#"
        className={column.grid_left_button}
        onClick={() => handleClick(-1)}
      >
        &lt;
      </a>

      <div className={column.grid_carousel}>
        <div className={style.slide_container}>
          {slideImage.map(image => (
            <img
              src={image.src}
              alt="carousel"
              key={image.id}
              className={classNames(style.home_slide, {
                [style.home_slide_active]: active === image.id,
                [style.home_slide_previous]: previousSlide === image.id,
              })}
            />
          ))}
        </div>

        <div className={style.slide_container_buttoms}>
          {slideImage.map(image => (
            <button
              key={image.id}
              className={classNames(style.slide_buttoms, {
                [style.slide_buttoms_active]: active === image.id,
              })}
              onClick={() => setActive(image.id)}
            ></button>
          ))}
        </div>
      </div>

      <a
        href="#"
        className={column.grid_right_button}
        onClick={() => handleClick(1)}
      >
        &gt;
      </a>
    </>
  );
};
