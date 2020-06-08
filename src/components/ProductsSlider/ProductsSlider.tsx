import React, { useState } from 'react';
import './ProductsSlider.scss';
import { Card } from '../Card/Card';
import Button from '../Button/Button';


type ProductsSliderProps = {
  title: string;
  visibleProducts: Slide[];
};

const ProductsSlider: React.FC<ProductsSliderProps> = ({ visibleProducts, title }) => {
  const [position, setPosition] = useState(0);
  const margin = 16;
  // const [widthCard, setWidthCard] = useState(0);
  const widthCard = 272 + margin;
  const widthCarousel = widthCard * (visibleProducts.length - 4);

  // const measuredRef = useCallback(
  //   node => {
  //     if (node !== null) {
  //       setWidthCard(node.getBoundingClientRect().width);
  // }}, []);


  const handleOnClick = (name: string) => {
    if (name === 'prev') {
      if (position === 0) {
        setPosition(-widthCarousel);
      } else {
        setPosition(position + widthCard);
      }
    }

    if (name === 'next') {
      setPosition(position - widthCard);
      if (-position > widthCarousel - widthCard) {
        setPosition(0);
      }
    }
  };


  return (
    <div className="wrapper">
      <h2>{title}</h2>
      <div className="container">
        <div className="Carousel__button btn-left">
          <Button
            className="prev"
            name="prev"
            disabled={position === 0}
            handleOnClick={handleOnClick}
          />
        </div>
        <div className="Carousel container__carousel">
          <div
            style={{ transform: `translate(${position}px)` }}
            className="Carousel__list"
          >
            {visibleProducts.map(product => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        </div>
        <div className="Carousel__button btn-right">
          <Button
            className="next"
            name="next"
            disabled={-position > widthCarousel - widthCard}
            handleOnClick={handleOnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
