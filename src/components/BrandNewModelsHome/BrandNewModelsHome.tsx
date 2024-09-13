import React from 'react';
import { Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Phone } from '../../types/phone';

type Props = {
  newModels: Phone[];
  type: 'Hot Prices' | 'Brand new models';
};

export const BrandNewModelsHome: React.FC<Props> = ({ newModels, type }) => {
  return (
    <>
      <div className="page-home__new-models">
        <h2 className="page-home__new-models__text">{type}</h2>

        <div className="page-home__new-models--arrow">
          <img
            className="page-home__new-models--arrow-disabled"
            src="/img/Buttons_Slider button - Disabled (right).svg"
            alt="Disabled"
          />
          <img
            className="page-home__new-models--arrow-default"
            src="/img/Buttons_Slider button - Default (right).svg"
            alt="Default"
          />
        </div>
      </div>

      <div className="page-home__list-new">
        {newModels.length > 0 && (
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
            {newModels.map(phone => (
              <SwiperSlide key={phone.id}>
                <div className="page-home-card">
                  <img
                    className="page-home-card__image"
                    src={phone.images[1]}
                    alt=""
                  />
                  <p className="page-home-card__name">{phone.name}</p>
                  <p className="page-home-card__price-regular">{`${phone.priceRegular}$`}</p>

                  <div className="page-home-card__line"></div>

                  <div className="page-home-card__screen">
                    <p className="page-home-card__screen-name">Screen</p>
                    <p className="page-home-card__screen-info">
                      {phone.screen}
                    </p>
                  </div>

                  <div className="page-home-card__capacity">
                    <p className="page-home-card__capacity-name">Capacity</p>
                    <p className="page-home-card__capacity-info">
                      {phone.capacity}
                    </p>
                  </div>

                  <div className="page-home-card__ram">
                    <p className="page-home-card__ram-name">Ram</p>
                    <p className="page-home-card__ram-info">{phone.ram}</p>
                  </div>

                  <div className="page-home-card__buy">
                    <button className="page-home-card__buy-cart">
                      Add to cart
                    </button>
                    <img src="/img/add-to-cart.svg" alt="add-to-cart" />
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
