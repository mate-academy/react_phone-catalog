import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';
import categorusFromApi from '../../api/categorys.json';
import { Category } from '../Category';
import { Card } from '../Card';
import { Context } from '../context';

export const Home: React.FC = () => {
  const { products } = useContext(Context);

  const settingsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settingsHotPrise = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const settingsNewModel = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,

    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const getHotPriceProducts = () => {
    return products
      .filter(product => product.discount > 0)
      .sort((product1, product2) => (
        ((product2.price / 100) * product2.discount)
        - ((product1.price / 100) * product1.discount)
      ));
  };

  const getBrandNewProducts = () => {
    return products
      .filter(product => product.discount === 0)
      .sort((product1, product2) => (
        product2.price - product1.price
      ));
  };

  return products.length > 0 ? (
    <main className="home">
      <section className="slider">
        <Slider {...settingsSlider}>
          {products
            .filter(product => product.type === 'tablet')
            .map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/${product.type}s/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.id}
                      className="slider__product"
                    />
                  </Link>
                </div>
              );
            })}
        </Slider>
      </section>
      <section className="hot-prise grid slider-cards">
        <h1 className="
        title
        grid_item_column--1-20
        grid_item_rows--1-2
        "
        >
          Hot prices
        </h1>
        <div className="grid_item_column--1-25 grid_item_rows--2-3">
          <Slider {...settingsHotPrise}>
            {getHotPriceProducts()
              .map(product => (
                <div key={product.id}>
                  <Card product={product} />
                </div>
              ))}
          </Slider>
        </div>
      </section>
      <section className="category">
        <h1>Shop by category</h1>

        <div className="categorys">
          {categorusFromApi.map(category => (
            <div key={category.title}>
              <Category category={category} />
            </div>
          ))}
        </div>

      </section>
      <section className="new_models grid hot-prise slider-cards">
        <h1 className="
        title
        grid_item_column--1-20
        grid_item_rows--1-2
        "
        >
          Brand new models
        </h1>
        <div className="grid_item_column--1-25 grid_item_rows--2-3">
          <Slider {...settingsNewModel}>
            {getBrandNewProducts()
              .map(product => (
                <div key={product.id}>
                  <Card product={product} />
                </div>
              ))}
          </Slider>
        </div>
      </section>
    </main>
  ) : (
    <main>
      <h1>Loading...</h1>
    </main>
  );
};
