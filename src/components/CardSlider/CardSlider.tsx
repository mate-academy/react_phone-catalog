import React, { useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { LeftArrow, RightArrow } from '../../components/SvgSprite/SvgSprite';


type CardSliderProps={
  goods: Good[];
  title: string;
}

export const CardSlider: React.FC<CardSliderProps> = ({ goods, title }) => {
  const cardWidth = 272;
  const gap = 16;
  const frameSize = 4;

  const sliderGoods = goods.map((good, index) => ({
    ...good,
    position: index + 1,
  }));

  const [position, setPosition] = useState<number>(1);
  const [left, setLeft] = useState<number>(0);
  let imgWidth = cardWidth * frameSize + gap * frameSize;

  const handleClick = (path: number) => {
    const newLeftPosition = (imgWidth) * -path;

    if (position === Math.ceil(sliderGoods.length/4) && path === 1) {
      setPosition(1);
      setLeft(0);

      return;
    }

    if (position === 1 && path === -1) {
      setPosition(Math.ceil(sliderGoods.length/4));
      setLeft(imgWidth * path * (Math.ceil(sliderGoods.length/4) - 1));

      return;
    }

    setPosition(position + path);
    setLeft(left + newLeftPosition);
  };

  return (
    <section className="homepage__view-products">
      <div className="view-products__wrapper">
        <h1 className="homepage__section-title">{title}</h1>
        <div className="view-products__btn-panel">

          <button className="view-products__btn"
            type="button"
            onClick={() => handleClick(-1)}
          >
            <LeftArrow />
          </button>
          <button className="view-products__btn"
            type="button"
            onClick={() => handleClick(1)}
          >
            <RightArrow />
          </button>
        </div>
      </div>
      <div className="view-products__slider-container">
        <div className="view-products__list"
          style={{
          transform: `translateX(${left}px)`,
          transition: `transform 0.5s ease`,
          display: 'grid',
          gridTemplateColumns: `repeat(${sliderGoods.length}, 272px)`,
          columnGap: '16px',
        }}>
          {sliderGoods.map(model => (
            <ProductCard good={model} key={model.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

