import React, { useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';

type CardSliderProps={
  goods: Good[];
}

export const CardSlider: React.FC<CardSliderProps> = ({ goods }) => {


  const sliderGoods = goods.map((good, index) => ({
    ...good,
    position: index + 1,
  }));

  const [position, setPosition] = useState(1);
  const [left, setLeft] = useState(0);
  let imgWidth = 272+16;

  const handleClick = (path: number) => {
    console.log('click')
    const newLeftPosition = (imgWidth) * -path;

    if (position === sliderGoods.length && path === 1) {
      setPosition(1);
      setLeft(0);

      return;
    }

    if (position === 1 && path === -1) {
      setPosition(sliderGoods.length);
      setLeft(imgWidth * path * (sliderGoods.length - 1));

      return;
    }

    setPosition(position + path);
    setLeft(left + newLeftPosition);
  };

  return (
    <section className="homepage__view-products">
      <div className="view-products__wrapper">
        <h1 className="homepage__section-title">Hot prices</h1>
        <div className="view-products__btn-panel">

          <button className="view-products__btn"
            type="button"
            onClick={() => handleClick(-1)}
          >
            <svg className="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4715
              3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868
              7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868
              12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318
              12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715
              4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
              fill="#B4BDC4"/>
            </svg>
          </button>
          <button className="view-products__btn"
            type="button"
            onClick={() => handleClick(1)}
          >
            <svg className="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.52876
              3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716
              7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157
              12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841
              12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876
              4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
              fill="#B4BDC4"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="view-products__slider-container">
        <div className="view-products__list"
          style={{
          transform: `translateX(${left}px)`,
          display: 'grid',
          gridTemplateColumns: `repeat(${sliderGoods.length}, 272px)`,
          columnGap: '16px',
        }}>
          {sliderGoods.map(model => (
            <ProductCard good={model} />
          ))}
        </div>
      </div>
    </section>
  )
}
