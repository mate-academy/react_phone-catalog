import React from 'react';

type Props = {
  image: string;
  alt: string;
};

export const Slide: React.FC<Props> = ({ image, alt }) => {
  return (
    <>
      <img src={image} alt={alt} loading="lazy" />
      <div className="swiper-lazy-preloader"></div>
    </>
  );
};
