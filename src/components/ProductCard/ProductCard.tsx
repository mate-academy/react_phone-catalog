/* eslint-disable import/no-extraneous-dependencies */
// import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Phone } from '../../Types/Phone';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from '../Card/Card';
// import { useProducts } from '../../helpers/CatalogContext/CatalogContext';

type Props = {
  products: Phone[],
  discount: boolean,
  title: string,
};

// eslint-disable-next-line
export const ProductCard: React.FC<Props> = ({ products, discount, title }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  // const { setCardsHeight } = useProducts();

  // const refContainer = useRef();
  // const refContainer = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (refContainer.current) {
  //     setCardsHeight(refContainer.current.offsetHeight);
  //   }
  // }, [setCardsHeight]);

  return (
    <>
      <div
        className="card-container"
        data-cy="cardsContainer"
        // ref={refContainer}
      >
        <h1 className="slick-title">{title}</h1>
        <Slider {...settings}>
          {products.map(card => (
            <Card card={card} discount={discount} />
          ))}
        </Slider>
      </div>
    </>
  );
};
