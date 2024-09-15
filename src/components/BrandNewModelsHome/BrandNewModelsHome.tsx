import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Products } from '../../types/products';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  type: 'Hot Prices' | 'Brand new models' | 'You may also like';
};

export const BrandNewModelsHome: React.FC<Props> = ({ type }) => {
  const [models, setModels] = useState<Products[]>([]);
  const [sortedModels, setSortedModels] = useState<Products[]>([]);
  const location = useLocation()

  function hotPrices(products: Products[]) {
    return [...products].sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;
      return discountB - discountA;
    });
  }

  function brandNewModels(products: Products[]) {
    return [...products].sort((a, b) => {
      return new Date(b.year).getTime() - new Date(a.year).getTime();
    });
  }

  function alsoLike(products: Products[]) {
    return products;
  }

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then(data => {
        setModels(data);
      });
  }, []);

  useEffect(() => {
    let sorted;
    switch (type) {
      case 'Hot Prices':
        sorted = hotPrices(models);
        break;
      case 'Brand new models':
        sorted = brandNewModels(models);
        break;
      case 'You may also like':
        sorted = alsoLike(models);
        break;
      default:
        sorted = models;
    }
    setSortedModels(sorted.slice(0, 10));
  }, [type, models]);

  return (
    <>
      <div className="page-home__new-models">
        <h2 className="page-home__new-models__text">{type}</h2>

        <div className="page-home__new-models--arrow">
          <img
            className="page-home__new-models--arrow-disabled"
            src="./img/Buttons_Slider button - Disabled (right).svg"
            alt="Disabled"
          />
          <img
            className="page-home__new-models--arrow-default"
            src="./img/Buttons_Slider button - Default (right).svg"
            alt="Default"
          />
        </div>
      </div>

      <div className="page-home__list-new">
        {sortedModels.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={150}
            slidesPerView={2}
            centeredSlides={true}
            loop={true}
            navigation={{
              prevEl: '.page-home__new-models--arrow-disabled',
              nextEl: '.page-home__new-models--arrow-default',
            }}
          >
            {sortedModels.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="page-home-card">
                  <Link state={{ from: location.pathname }} to={`/${product.category}/${product.itemId}`}>
                    <img
                      className="page-home-card__image"
                      src={product.image} // Ensure correct image path
                      alt={product.image}
                    />
                  </Link>

                  <p className="page-home-card__name">{product.name}</p>
                  <p className="page-home-card__price-regular">{`${product.price}$`}</p>

                  <div className="page-home-card__line"></div>

                  <div className="page-home-card__screen">
                    <p className="page-home-card__screen-name">Screen</p>
                    <p className="page-home-card__screen-info">
                      {product.screen}
                    </p>
                  </div>

                  <div className="page-home-card__capacity">
                    <p className="page-home-card__capacity-name">Capacity</p>
                    <p className="page-home-card__capacity-info">
                      {product.capacity}
                    </p>
                  </div>

                  <div className="page-home-card__ram">
                    <p className="page-home-card__ram-name">Ram</p>
                    <p className="page-home-card__ram-info">{product.ram}</p>
                  </div>

                  <div className="page-home-card__buy">
                    <button className="page-home-card__buy-cart">
                      Add to cart
                    </button>
                    <img src="./img/add-to-cart.svg" alt="add-to-cart" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
