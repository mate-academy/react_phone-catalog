
import React, { useState } from 'react';
import { CatalogPropsType } from '../../interfaces';
import { ProductCard } from '../ProductCard/ProductCard';
import './CardsSlider.scss';

export const CardsSlider = ({
  title,
  products,
  cart,
  setCart,
  favorites,
  setFavorites
}: CatalogPropsType) => {

  const [left, setLeft] = useState(-8);

  const handleLeftClick = () => {
    if(left >= -8) {
      return;
    }
    setLeft(left + 288);
  }
  const handleRightClick = () => {
    if(left <= -((products.length - 4) * 288)) {
      return;
    }
    setLeft(left - 288);
  }


  return (
    <div className="CardsSlider">
      <div className="CardsSlider__head-container">
        <h1 className="CardsSlider__title">{title}</h1>
        <div className="CardsSlider__buttons-container">
          <button
            className="CardsSlider__button"
            onClick={handleLeftClick}
          >
            {'<'}
          </button>
          <button
            className="CardsSlider__button"
            onClick={handleRightClick}
          >
            {'>'}
          </button>
        </div>
      </div>
      <div className="CardsSlider__stripe-container">
        <ul className="CardsSlider__stripe" style={{ left: `${left}px` }}>
          {products.map(product => {
            return (
              <li>
                <ProductCard
                  product={product}
                  cart={cart}
                  setCart={setCart}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </li>
            )
          })}
        </ul>
      </div>


    </div>

  )
}
