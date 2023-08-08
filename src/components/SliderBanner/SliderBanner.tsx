import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { BtnSliderBanner } from './BtnSliderBanner';
import './style.scss';

type Props = {
  dataSlider: string[]
};

export const SliderBanner: React.FC<Props> = ({ dataSlider }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index: number) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevS) => {
        const slideInd = (prevS + 1) % dataSlider.length;

        switch (slideInd) {
          case 0:
            return dataSlider.length;
          case dataSlider.length:
            return 0;
          default:
            return slideInd;
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container-slider">
      {dataSlider.map((elem, index) => {
        return (
          <div
            key={elem}
            className={
              slideIndex === index + 1
                ? 'slide active-anim'
                : 'slide'
            }
          >
            <img
              src={`${process.env.PUBLIC_URL}${elem}`}
              alt={elem}
            />
          </div>
        );
      })}
      <BtnSliderBanner moveSlide={nextSlide} direction="next" />
      <BtnSliderBanner moveSlide={prevSlide} direction="prev" />
      <ul className="container-dots dots__list">
        {dataSlider.map((item, index) => (
          <li key={item} className="dots__item">
            <button
              type="button"
              aria-label="dot"
              onClick={() => moveDot(index + 1)}
              className={classNames(
                'dot',
                { 'dot--active': slideIndex === index + 1 },
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
