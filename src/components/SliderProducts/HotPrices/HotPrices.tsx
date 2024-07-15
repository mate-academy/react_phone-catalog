import './HotPrices.scss';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Gadget } from '../../../types/Gadget';
import { getHotPrices } from '../../../services/getHotPrices';
import { ButtonAddCart } from '../../ButtonAddCart';
import { ButtonHeart } from '../../ButtonHeart';
import { Link } from 'react-router-dom';

export const HotPrices: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Gadget[]>([]);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const products = await getHotPrices();

      setSuggestedProducts(products);
    };

    fetchSuggestedProducts();
  }, []);

  return (
    <div className="hotprices">
      <div className="hotprices__header">
        <h3 className="hotprices__header--title">Hot prices</h3>
        <div className="hotprices__header--buttons hotprices-swiper-btn">
          <button className="hotprices-swiper-btn__prev">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
          </button>
          <button className="hotprices-swiper-btn__next">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className="hotprices__swiper">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
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
            nextEl: '.hotprices-swiper-btn__next',
            prevEl: '.hotprices-swiper-btn__prev',
          }}
          className="hotprices__list"
        >
          {suggestedProducts.map(product => (
            <SwiperSlide
              key={product.id}
              className="hotprices__list--card newmodels-card"
            >
              <Link
                to={`/${product.category}/${product.itemId}`}
                className="hotprices-card__picture"
              >
                <img
                  className="hotprices-card__picture--img"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <Link
                to={`/${product.category}/${product.itemId}`}
                className="hotprices-card__title"
              >
                {product.name}
              </Link>
              <div className="hotprices-card__price">
                <p className="hotprices-card__price--disc">{`$${product.price}`}</p>
                <p className="hotprices-card__price--regular">
                  {`$${product.fullPrice}`}
                </p>
              </div>
              <ul className="hotprices-card__tech">
                <li className="hotprices-card__tech--item hotprices-item">
                  <p className="hotprices-item__name">Screen</p>
                  <p className="hotprices-item__param">{product.screen}</p>
                </li>
                <li className="hotprices-card__tech--item hotprices-item">
                  <p className="hotprices-item__name">Capacity</p>
                  <p className="hotprices-item__param">{product.capacity}</p>
                </li>
                <li className="hotprices-card__tech--item hotprices-item">
                  <p className="hotprices-item__name">RAM</p>
                  <p className="hotprices-item__param">{product.ram}</p>
                </li>
              </ul>
              <div className="hotprices-card__buttons">
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
