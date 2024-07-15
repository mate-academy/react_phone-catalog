import './NewModels.scss';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import { Gadget } from '../../../types/Gadget';
import { getNewModels } from '../../../services/getNewModels';
import { ButtonAddCart } from '../../ButtonAddCart';
import { ButtonHeart } from '../../ButtonHeart';
import { Link } from 'react-router-dom';

export const NewModels: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Gadget[]>([]);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const products = await getNewModels();

      setSuggestedProducts(products);
    };

    fetchSuggestedProducts();
  }, []);

  return (
    <div className="newmodels">
      <div className="newmodels__header">
        <h3 className="newmodels__header--title">Brand new models</h3>
        <div className="newmodels__header--buttons newmodels-swiper-btn">
          <button className="newmodels-swiper-btn__prev">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
          </button>
          <button className="newmodels-swiper-btn__next">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className="newmodels__swiper">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1.4,
              spaceBetween: 16,
              loop: false,
            },

            450: {
              slidesPerView: 2,
              spaceBetween: 16,
              loop: false,
            },

            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
              loop: false,
            },

            800: {
              slidesPerView: 3,
              spaceBetween: 16,
              loop: false,
            },

            1000: {
              slidesPerView: 3.5,
              spaceBetween: 16,
              loop: false,
            },

            1200: {
              slidesPerView: 4,
              spaceBetween: 16,
              loop: false,
            },
          }}
          navigation={{
            nextEl: '.newmodels-swiper-btn__next',
            prevEl: '.newmodels-swiper-btn__prev',
          }}
          className="newmodels__list"
        >
          {suggestedProducts.map(product => (
            <SwiperSlide
              key={product.id}
              className="newmodels__list--card newmodels-card"
            >
              <Link
                to={`/${product.category}/${product.itemId}`}
                className="newmodels-card__picture"
              >
                <img
                  className="newmodels-card__picture--img"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <Link
                to={`/${product.category}/${product.itemId}`}
                className="newmodels-card__title"
              >
                {product.name}
              </Link>
              <p className="newmodels-card__price">{`$${product.fullPrice}`}</p>
              <ul className="newmodels-card__tech">
                <li className="newmodels-card__tech--item newmodels-item">
                  <p className="newmodels-item__name">Screen</p>
                  <p className="newmodels-item__param">{product.screen}</p>
                </li>
                <li className="newmodels-card__tech--item newmodels-item">
                  <p className="newmodels-item__name">Capacity</p>
                  <p className="newmodels-item__param">{product.capacity}</p>
                </li>
                <li className="newmodels-card__tech--item newmodels-item">
                  <p className="newmodels-item__name">RAM</p>
                  <p className="newmodels-item__param">{product.ram}</p>
                </li>
              </ul>
              <div className="newmodels-card__buttons">
                <ButtonAddCart productId={product.itemId} />
                <ButtonHeart productId={product.itemId} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
