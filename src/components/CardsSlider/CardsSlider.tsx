
import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces';
import { ProductCard } from '../ProductCard/ProductCard';
import './CardsSlider.scss';

export const CardsSlider = ({ title, products }: { title: string; products: Product[] }) => {
  const [left, setLeft] = useState(-8);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState<boolean>(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState<boolean>(false);
  const handleLeftClick = () => {
    setLeft(left + 288);
  }
  const handleRightClick = () => {
    setLeft(left - 288);
  }

  useEffect(() => {
    if (left >= -8) {
      setIsLeftButtonDisabled(true)
    } else {
      setIsLeftButtonDisabled(false)
    };
    if (left <= -((products.length - 4) * 288)) {
      setIsRightButtonDisabled(true)
    } else {
      setIsRightButtonDisabled(false)
    }
  }, [left, products])


  return (
    <div className="CardsSlider">
      <div className="CardsSlider__head-container">
        <h1 className="CardsSlider__title">{title}</h1>
        <div className="CardsSlider__buttons-container">
          <button
            className="CardsSlider__button CardsSlider__button--left"
            onClick={handleLeftClick}
            disabled={isLeftButtonDisabled}
          >
          </button>
          <button
            className="CardsSlider__button CardsSlider__button--right"
            onClick={handleRightClick}
            disabled={isRightButtonDisabled}
          >
          </button>
        </div>
      </div>
      <div className="CardsSlider__stripe-container">
        <ul className="CardsSlider__stripe" style={{ left: `${left}px` }}>
          {products.map(product => {
            return (
              <li key={product.id}>
                <ProductCard
                  product={product}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
