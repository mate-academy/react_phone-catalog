import React from 'react';

export const CarouselSlides = ({
  slides,
  moveSize,
  duration,
}: CarouselSlidesProps) => {
  return (
    <ul
      className="carousel__list"
      style={{
        transform: `translateX(${-moveSize}px)`,
        transitionDuration: `${duration}s`,
      }}
    >
      {slides.map(({ id, name, src }) => (
        <li key={id} className="carousel__item">
          <img
            className="carousel__image"
            src={src}
            alt={name}
          />
        </li>
      ))}
    </ul>
  );
};
