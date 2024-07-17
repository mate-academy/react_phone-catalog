import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { Card } from '../Card/Card';

type Props = {
  title: string;
  models: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, models }) => {
  const [startImage, setStartImage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let cardWidth = 228;

  if (windowWidth >= 640) {
    cardWidth = 253;
  }

  if (windowWidth >= 1200) {
    cardWidth = 288;
  }

  const countToMove = Math.floor(Math.min(windowWidth, 1200) / cardWidth);

  const handlePrevImage = () => {
    if (startImage > 0) {
      setStartImage(prevStartImage => prevStartImage - countToMove);
    }
  };

  const handleNextImage = () => {
    if (startImage !== models.length - Math.floor(windowWidth / cardWidth)) {
      setStartImage(prevStartImage => prevStartImage + countToMove);
    }
  };

  const translateX = startImage * cardWidth;

  return (
    <section className="page__section slider-section">
      <div className="slider-section__wrapper">
        <h2 className="page__title">{title}</h2>
        <div className="slider-section__buttons">
          <button
            onClick={handlePrevImage}
            type="button"
            className={classNames('button button--prev', {
              'button--active': startImage !== 0,
            })}
            disabled={startImage === 0}
          ></button>
          <button
            onClick={handleNextImage}
            type="button"
            className={classNames('button button--next', {
              'button--active':
                startImage !==
                models.length - Math.floor(windowWidth / cardWidth),
            })}
            disabled={startImage > models.length - countToMove}
          ></button>
        </div>
      </div>

      <div
        className="slider-section__container"
        style={{
          transform: `translateX(-${translateX}px)`,
        }}
      >
        {models.map(model => (
          <Card
            model={model}
            width={(cardWidth - 16).toString()}
            key={model.id}
          />
        ))}
      </div>
    </section>
  );
};
