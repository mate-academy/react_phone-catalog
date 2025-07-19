import './PicturesSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const PicturesSlider = () => (
  <section className="slider-block">
    <h1 className="slider-block__text">Welcome to Nice Gadgets store!</h1>
    <div className="slider">
      <Swiper
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.slider__nav-next',
          prevEl: '.slider__nav-prev',
        }}
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <div className="">
            <picture>
              <source srcSet="slider/image3.png" media="(min-width: 1200px)" />
              <source srcSet="slider/image2.png" media="(min-width: 640px)" />

              <img
                className="slider__picture"
                src="slider/image1.png"
                alt="iPhone 14"
              />
            </picture>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="">
            <picture>
              <source srcSet="slider/image3.png" media="(min-width: 1200px)" />
              <source srcSet="slider/image2.png" media="(min-width: 640px)" />
              <img
                className="slider__picture"
                src="slider/image1.png"
                alt="iPhone 14"
              />
            </picture>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="">
            <picture>
              <source srcSet="slider/image3.png" media="(min-width: 1200px)" />
              <source srcSet="slider/image2.png" media="(min-width: 640px)" />
              <img
                className="slider__picture"
                src="slider/image1.png"
                alt="iPhone 14"
              />
            </picture>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="slider__controls">
        <div className="slider__nav-prev">
          <svg
            className="slider__icon"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="
                  M5.47149 0.528606
                  C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606
                  L0.528677 4.52861
                  C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141
                  L4.52868 9.47141
                  C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141
                  C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861
                  L1.94289 5.00001
                  L5.47149 1.47141
                  C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606
                  Z
                "
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="slider__nav-next">
          <svg
            className="slider__icon"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="
                  M0.528758 0.528606
                  C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606
                  L5.47157 4.52861
                  C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141
                  L1.47157 9.47141
                  C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141
                  C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861
                  L4.05735 5.00001
                  L0.528758 1.47141
                  C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606
                  Z
                "
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
);
