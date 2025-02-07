import React from 'react';
import style from './Carousel.module.scss';

type Props = {
  description: string;
  image: string;
};

export const CarouselItem: React.FC<Props> = ({ description, image }) => {
  return (
    <div className={style.carousel__item}>
      <img className={style.carousel__img} src={image} alt={description} />
    </div>
  );
};
