import { useEffect, useState } from 'react';
import column from '../../grid.module.scss';
import style from './homeface.module.scss';
import classNames from 'classnames';

const slideImage = [
  { id: 0, src: './img/banner.png' },
  { id: 1, src: './img/banner-phones.png' },
  { id: 2, src: './img/banner-accessories.png' },
];

export const HomeCarousel = () => {
  const [active, setActive] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev < slideImage.length ? (prev + 1) % 3 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [active]);

  const handleClick = (scale: number) => {
    const totalSlides = 3;
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
          <button
            className={classNames(style.slide_buttoms, {
              [style.slide_buttoms_active]: active === 0,
            })}
            onClick={() => setActive(0)}
          ></button>
          <button
            className={classNames(style.slide_buttoms, {
              [style.slide_buttoms_active]: active === 1,
            })}
            onClick={() => setActive(1)}
          ></button>
          <button
            className={classNames(style.slide_buttoms, {
              [style.slide_buttoms_active]: active === 2,
            })}
            onClick={() => setActive(2)}
          ></button>
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
