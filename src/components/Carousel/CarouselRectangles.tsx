import React from 'react';
import cn from 'classnames';

export const CarouselRectangles = ({
  slides,
  active,
}: CarouselRectanglesProps) => {
  return (
    <div className="carousel__rectangles">
      {slides.map((slide, i) => (
        <span
          key={slide.id}
          className={cn({
            carousel__rectangle: true,
            'carousel__rectangle--active': active === i,
          })}
        />
      ))}
    </div>
  );
};
