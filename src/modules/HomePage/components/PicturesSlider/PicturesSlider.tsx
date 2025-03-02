import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import './PicturesSlider.scss';

const PicturesSlider: React.FC = () => {
  const images = [
    `${process.env.PUBLIC_URL}/img/banners/banner-1.png`,
    `${process.env.PUBLIC_URL}/img/banners/banner-2.png`,
    `${process.env.PUBLIC_URL}/img/banners/banner-3.png`,
  ];

  return (
    <>
      <section className="banner">
        <div className="banner__wrapper">
          <button
            className={`banner__button banner__button--prev`}
            aria-label="Previous picture"
          ></button>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: `.banner__button--prev`,
              nextEl: `.banner__button--next`,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              el: '.banner__pagination',
              clickable: true,
            }}
            speed={500}
            loop={true}
            className="banner__container"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="banner__slide">
                <img src={image} alt={`banner-${index}`} className="banner__image" />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`banner__button banner__button--next`}
            aria-label="Next picture"
          ></button>
        </div>

        <div className="banner__pagination"></div>
      </section>
    </>
  );
};

export default PicturesSlider;
