import React from 'react';
import cn from 'classnames';

export const CarouselDots = ({
  slides,
  active,
  goToSlide,
}: CarouselDotsProps) => (
  <div className="carousel__dots">
    {slides.map((slide, index) => (
      <button
        key={slide.id}
        type="button"
        aria-label={`Got to ${index + 1} slide`}
        onClick={() => goToSlide(index)}
        className={cn({
          carousel__dot: true,
          'carousel__dot--active': active === index,
        })}
      />
    ))}
  </div>
);
