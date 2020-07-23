import React, { useState } from 'react';
import { Phone }  from '../interfaces';
import { CarouselItem } from './CarouselItem';
import { handleMove } from '../helpers/handleMove';


interface Props {
  phones: Phone[];
  width: string;
  perRow: number;
  screenWidth: number;
  title: string;
}

export const Carousel: React.FC<Props> = ({ phones, width, perRow, screenWidth, title }) => {
  const [margin, setMargin] = useState(0);
  const maxMargin = -(phones.length - 4) * 285;
  const handleClick = (option: string) => {
    const marginNew = handleMove(option, margin);
   console.log(marginNew, margin);
   setMargin(marginNew);
  }
  console.log(width, perRow, 11, screenWidth)
  return (
    <>
      <div className="carousel">
        <div className="carousel__top">
          <h2 className="carousel__title">{title}</h2>
          <div className="carousel__button-wrapper">
            <button
              disabled={margin >= 0}
              className="carousel__button carousel__button--forward"
              onClick={() => handleClick('back')}
            >
              &#60;
            </button>
            <button
              disabled={margin <= maxMargin}
              className="carousel__button carousel__button--back"
              onClick={() => handleClick('forward')}
            >
              &#62;
            </button>
          </div>
        </div>
        <ul style={{ width: `${width}px` }} className="carousel__list">
          {
            phones.map((phone, index) => (
              <CarouselItem key={phone.name} index={index} margin={margin} phone={phone} />
            ))
          }
        </ul>
      </div>
    </>
  )
}
