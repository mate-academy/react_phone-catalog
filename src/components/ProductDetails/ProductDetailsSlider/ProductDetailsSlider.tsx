/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import './ProductDetailsSlider.scss';
import { ProductsContext } from '../../../context/ProductContext';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { getSuggestedProducts } from '../../../utils/recommendations';
import { Phones } from '../../../types/Phones';
import { Tablets } from '../../../types/Tablets';
import { Accessories } from '../../../types/Accessories';

type Props = {
  currentId: string
  modelName: string;
  modelCapacity: string;
  modelColor: string;
  category: string;
};

export const ProductDetailsSlider: React.FC<Props> = ({
  currentId,
  modelName,
  modelCapacity,
  modelColor,
  category,
}) => {
  const { phones, tablets, accessories } = useContext(ProductsContext);
  // eslint-disable-next-line max-len
  const [products, setProducts] = useState<Phones[] | Tablets[] | Accessories[]>([]);

  useEffect(() => {
    if (category === 'phones') {
      setProducts(phones);
    }

    if (category === 'tablets') {
      setProducts(tablets);
    }

    if (category === 'accessories') {
      setProducts(accessories);
    }
  }, [category]);

  const newProducts = getSuggestedProducts(
    products,
    currentId,
    modelName,
    modelColor,
    modelCapacity,
  );

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { onToggleLike, favoritesProducts } = useContext(ProductsContext);
  const { onAddProduct, addedCartProducts } = useContext(ProductsContext);

  useEffect(() => {
    if (newProducts.length > 1) {
      setIsBeginning(true);
      setIsEnd(false);
    } else {
      setIsBeginning(true);
      setIsEnd(true);
    }
  }, [newProducts.length]);

  return (
    <section className="rec-slider">
      <div className="rec-slider__header">
        <h2 className="rec-slider__title">You may also like</h2>

        <div className="rec-slider__controls">
          <div
            className={classNames('rec-slider__nav-prev', {
              'is-disabled': isBeginning,
            })}
          >
            <svg
              className="slider-icon"
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M5.47149 0.528606 C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606 L0.528677 4.52861 C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141 L4.52868 9.47141 C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141 C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861 L1.94289 5.00001 L5.47149 1.47141 C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div
            className={classNames('rec-slider__nav-next', {
              'is-disabled': isEnd,
            })}
          >
            <svg
              className="slider-icon"
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="rec-slider__container">
        <Swiper
          modules={[Navigation]}
          observer={true}
          observeParents={true}
          onSwiper={swiper => {
            if (newProducts.length > 0) {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }
          }}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          navigation={{
            nextEl: '.rec-slider__nav-next',
            prevEl: '.rec-slider__nav-prev',
          }}
          slidesPerView={1.5}
          spaceBetween={1}
          slidesOffsetBefore={16}
          loop={false}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
              spaceBetween: 0,
              slidesOffsetBefore: 24,
            },
            768: {
              slidesPerView: 2.8,
              spaceBetween: 0,
              slidesOffsetBefore: 24,
            },
            992: {
              slidesPerView: 3.5,
              spaceBetween: 0,
              slidesOffsetBefore: 24,
            },
            1200: {
              slidesPerView: 4,
              slidesOffsetBefore: 0,
              spaceBetween: 0,
            },
          }}
        >
          {newProducts.map(prod => (
            <SwiperSlide key={prod.id}>
              <div className="product-card">
                <Link
                  to={`/${category}/${prod.id}`}
                  className="card__link-product-id"
                >
                  <img
                    className="product-card__image"
                    src={prod.images[0]}
                    alt={prod.name}
                  />
                  <p className="product-card__name">{prod.name}</p>
                </Link>
                <div className="hot-prices">
                  <p className="hot-prices__price">${prod.priceDiscount}</p>
                  <p className="hot-prices__full_price">${prod.priceRegular}</p>
                </div>
                <div className="product-card__spec">
                  <p className="product-card__label">Screen</p>
                  <p className="product-card__value">{prod.screen}</p>
                </div>
                <div className="product-card__spec">
                  <p className="product-card__label">Capacity</p>
                  <p className="product-card__value">{prod.capacity}</p>
                </div>
                <div className="product-card__spec">
                  <p className="product-card__label">RAM</p>
                  <p className="product-card__value">{prod.ram}</p>
                </div>

                <div className="product-card__actions">
                  <button
                    className={classNames('product-card__add', {
                      'product-card__add--active': addedCartProducts.some(a => {
                        return a.productId === prod.id;
                      }),
                    })}
                    onClick={() => {
                      onAddProduct(prod.id);
                    }}
                  >
                    {addedCartProducts.some(a => {
                      return a.productId === prod.id;
                    })
                      ? 'Added to cart'
                      : 'Add to cart'}
                  </button>
                  <button
                    className="product-card__like"
                    onClick={() => {
                      onToggleLike(prod.id);
                    }}
                  >
                    {!favoritesProducts.includes(prod.id) && (
                      <img src="./icons/like.svg" alt="like" />
                    )}
                    {favoritesProducts.includes(prod.id) && (
                      <img src="./icons/liked.svg" alt="like" />
                    )}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
