import { useState } from 'react';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowButton } from './ArrowButton';
import bannerAccessories from '../images/banner-accessories.png';
import bannerPhones from '../images/banner-phones.png';
import bannerTablets from '../images/banner-tablets.png';

export const Banner: React.FC = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);
  const [banner] = useState([bannerAccessories, bannerPhones, bannerTablets]);

  const handleNext = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  return (
    <section
      className="content-padding flex flex-col
      gap-6 max-md:px-0 md:gap-8 lg:gap-14"
    >
      <h1 className="content-padding m-0 md:px-0">
        Welcome to Nice Gadgets store!
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex md:h-48 md:gap-x-5 lg:h-100 lg:gap-x-4">
          <ArrowButton
            className="hidden h-full md:flex"
            position="left"
            onClick={handlePrev}
          />

          <Swiper
            pagination={{
              el: '#banner-container-of-bullets',
              type: 'bullets',
              bulletClass: 'h-1 w-3.5 bg-elements cursor-pointer',
              bulletActiveClass: 'bg-primary',
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            onSwiper={setSwiperRef}
            slidesPerView="auto"
            loop
            className="flex w-full"
            autoplay
          >
            {banner.map(item => (
              <SwiperSlide style={{ width: 'auto' }} key={item}>
                <img
                  src={item}
                  alt="Banner"
                  className="aspect-square w-full object-cover
                  md:aspect-auto md:h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <ArrowButton
            className="hidden h-full md:flex"
            position="right"
            onClick={handleNext}
          />
        </div>
        <div
          id="banner-container-of-bullets"
          className="flex justify-center gap-2.5 px-1 py-2.5"
        ></div>
      </div>
    </section>
  );
};
