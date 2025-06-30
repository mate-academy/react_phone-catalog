/* eslint-disable max-len */

import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import 'swiper/css/navigation';
import './Brand.scss';
import 'swiper/css';

interface Props {
  phones: Product[];
}

export const Brand: React.FC<Props> = ({ phones }) => {
  const [phonesStorage, setPhonesStorage] = useState<Product[]>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);

  const [prevEl, setPrevEl] = useState<HTMLDivElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!phones) {
      return;
    }

    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    setPhonesStorage(JSON.parse(localStorage.getItem('phones') || '[]'));
  }, [phones]);

  return (
    <section className="brend">
      <div className="brend-content">
        <div className="brend__top">
          <h2 className="brend__top-h2">Brand new models</h2>

          <div className="brend__top-buttons">
            <div
              className="brend__top-buttons-button button-01"
              ref={node => setPrevEl(node)}
            >
              <div className="brend__top-buttons-button-left left"></div>
            </div>

            <div
              className="brend__top-buttons-button button-02"
              ref={node => setNextEl(node)}
            >
              <div className="brend__top-buttons-button-right right"></div>
            </div>
          </div>
        </div>

        <Swiper
          className="brend__bottom"
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={16}
          navigation={{ prevEl, nextEl }}
          onSwiper={swiper => {
            setTimeout(() => {
              if (swiper.navigation) {
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
        >
          {phones.map(p => (
            <SwiperSlide key={p.id}>
              <article className="brend__bottom-phone-card">
                <div className="brend__bottom-phone-card-content">
                  <Link
                    state={{ from: 'Home' }}
                    className="link-img"
                    to={`product/${p.name}`}
                  >
                    <img
                      className="brend__bottom-phone-card-img"
                      src={p.images[0]}
                      alt="Phone-img"
                    />
                  </Link>

                  <Link
                    to={`product/${p.name}`}
                    state={{ from: 'Home' }}
                    className="brend__bottom-phone-card-name"
                  >
                    <span className="brend__bottom-phone-card-name-text">
                      {p.name}
                    </span>
                  </Link>

                  <div className="brend__bottom-phone-card-price">{`$${p.priceRegular}`}</div>

                  <div className="brend__bottom-phone-card-characteristics">
                    <div className="brend__bottom-phone-card-characteristics-item">
                      <div className="characteristics-text first">Screen</div>
                      <div className="characteristics-text screen-text">
                        {p.screen}
                      </div>
                    </div>

                    <div className="brend__bottom-phone-card-characteristics-item">
                      <div className="characteristics-text first">Capacity</div>
                      <div className="characteristics-text">{p.capacity}</div>
                    </div>

                    <div className="brend__bottom-phone-card-characteristics-item">
                      <div className="characteristics-text first">RAM</div>
                      <div className="characteristics-text">{p.ram}</div>
                    </div>
                  </div>

                  <div className="brend__bottom-phone-card-down">
                    <button
                      className={classNames(
                        'brend__bottom-phone-card-down-button',
                        {
                          'in-cart': elementsCart.some(obj => obj.id === p.id),
                        },
                      )}
                      onClick={() => {
                        const elements = addInCart(p);

                        setElementsCart(elements);
                      }}
                    >
                      {elementsCart.some(obj => obj.id === p.id)
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </button>

                    <div
                      className="brend__bottom-phone-card-down-button-save"
                      onClick={() => {
                        const updated = togglePhoneInStorage(p, 'phones');

                        setPhonesStorage(updated);
                      }}
                    >
                      <div
                        className={classNames(
                          'brend__bottom-phone-card-down-button-save-img',
                          {
                            'is-phone-favourites': phonesStorage?.some(
                              item => item.id === p.id,
                            ),
                          },
                        )}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
