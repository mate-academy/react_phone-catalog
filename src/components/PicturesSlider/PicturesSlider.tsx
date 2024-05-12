/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

import arrowLeft from '../../images/Main/arrow-left.svg';
import arrowRight from '../../images/Main/arrow-right.svg';
import Elipse from './Components/Elipse/Elipse';
import { Picture } from '../../types/Picture';

type Props = {
  picture: Picture[];
};

const PicturesSlider: React.FC<Props> = ({ picture }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? picture.length - 1 : prevIndex - 1,
    );
  };

  const nextImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === picture.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const changeImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
  });

  return (
    <>
      <div className="pictures" {...handlers}>
        <button
          className="pictures__button pictures__button--prev"
          onClick={prevImage}
        >
          <img src={arrowLeft} alt="left" className="pictures__button--icon" />
        </button>

        <div className="pictures__block">
          <div
            className="pictures__container"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {picture.map(({ id, src, title }) => (
              <Link to={`/${title}`} key={id} className="pictures__link">
                <img src={src} alt={title} className="pictures__img" />
              </Link>
            ))}
          </div>
        </div>

        <button
          className="pictures__button pictures__button--next"
          onClick={nextImage}
        >
          <img
            src={arrowRight}
            alt="right"
            className="pictures__button--icon"
          />
        </button>
      </div>

      <div className="pictures__elipse">
        {picture.map((_, index) => (
          <Elipse
            key={index}
            active={currentIndex === index}
            onClick={() => changeImage(index)}
          />
        ))}
      </div>
    </>
  );
};

export default PicturesSlider;
