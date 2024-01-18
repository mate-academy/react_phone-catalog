import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductsDiscount.scss';

import React, { useContext } from 'react';
import { ProductCard } from '../../../components/ProductCard';
import { PageContext } from '../../../utils/GlobalContext';

export const ProductsDiscount = React.memo(() => {
  const {
    products,
  } = useContext(PageContext);

  const productsOnDiscount = products.length
    ? products
      .sort((product1, product2) => {
        const discount1 = product1.fullPrice - product1.price;
        const discount2 = product2.fullPrice - product2.price;

        return discount2 - discount1;
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
    <div className="hot-price">
      <h1 className="hot-price__title">Hot prices</h1>

      {!productsOnDiscount.length
        && (
          <h2 className="hot-price__error">
            We are looking for the most interesting proposition for you &#10084;
          </h2>
        )}
      {!!productsOnDiscount.length
        && (
          <Slider {...settings} data-cy="cardsContainer">
            {productsOnDiscount.map(product => {
              return (
                <ProductCard
                  product={product}
                  section="hot"
                  key={product.id}
                />
              );
            })}
          </Slider>
        )}

    </div>
  );
});
