import React from 'react';

export const CarouselControl = ({
  changeSlide,
  direction
}: CarouselControlProps
) => {
  return (
    <button
      type="button"
      className={`carousel__btn carousel__btn--${direction}`}
      aria-label={`Slide ${direction}`}
      onClick={() => changeSlide(direction)}
    />
  )
}
