import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewProducts.scss';

import React, { useContext } from 'react';
import { ProductCard } from '../../../components/ProductCard';
import { PageContext } from '../../../utils/GlobalContext';

export const NewProduct = React.memo(() => {
  const {
    products,
  } = useContext(PageContext);

  const theNewestProducts = products.length
    ? products
      .sort((product1, product2) => {
        return product2.year - product1.year;
      })
      .sort((product1, product2) => {
        return product2.price - product1.price;
      })
      .slice(0, 8)
    : products;

  const settings = {
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    className: 'slider',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="new-products">
      <h1 className="new-products__title">Brand new models</h1>

      {!theNewestProducts.length
        && (
          <h2 className="new-products__error">
            We are looking for the most interesting proposition for you &#10084;
          </h2>
        )}
      {!!theNewestProducts.length
        && (
          <Slider {...settings} data-cy="cardsContainer">
            {theNewestProducts.map(product => {
              return (
                <ProductCard
                  product={product}
                  section="new"
                  key={product.id}
                />
              );
            })}
          </Slider>
        )}

    </div>
  );
});
