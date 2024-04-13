// import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import arrowIcon from '../images/icons/arrow-icon.svg';
import accessoriesBanner from '../images/banner-accessories.png';
import phonesBanner from '../images/banner-phones.png';
import tabletsBanner from '../images/banner-tablets.png';

const swiperItems = [accessoriesBanner, phonesBanner, tabletsBanner];

export const Banner = () => {
  return (
    <div className="max-w-6xl	">
      <div className="flex flex-col gap-4.5">
        <div className="flex h-80 w-full md:h-48 md:gap-5 lg:h-100 lg:gap-4">
          <button
            id="banner-prew-button"
            className="hidden min-w-8 items-center justify-center border
            border-icons hover:border-secondary md:flex"
          >
            <img src={arrowIcon} alt="Arrow Left" className="-rotate-90" />
          </button>

          <Swiper
            className="flex w-full"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={5}
            navigation={{
              prevEl: '#banner-prew-button',
              nextEl: '#banner-next-button',
            }}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
            }}
            pagination={{
              bulletActiveClass: 'bg-primary',
              bulletClass: 'w-3.5 h-full bg-elements block',
              el: '#banner-navigation',
              type: 'bullets',
              clickable: true,
            }}
          >
            {swiperItems.map(item => (
              <SwiperSlide key={item} className="w-full">
                <img
                  src={item}
                  alt="Banner"
                  className="block h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            id="banner-next-button"
            className="hidden min-w-8 items-center justify-center border
            border-icons hover:border-secondary md:flex"
          >
            <img src={arrowIcon} alt="Arrow Right" className="rotate-90" />
          </button>
        </div>

        <div
          className="flex h-1 cursor-pointer justify-center gap-3.5"
          id="banner-navigation"
        />
      </div>
    </div>
  );
};
