import React from 'react';
import cn from 'classnames';

export const CarouselRectangles = ({
  slides,
  active,
  goToSlide,
}: CarouselRectanglesProps) => (
  <div className="carousel__rectangles">
    {slides.map((slide, index) => (
      <button
        key={slide.id}
        type="button"
        aria-label={`Got to ${index + 1} slide`}
        onClick={() => goToSlide(index)}
        className={cn({
          carousel__rectangle: true,
          'carousel__rectangle--active': active === index,
        })}
      />
    ))}
  </div>
);
