import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import { useContext } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { PhoneContext } from '../Context/contex';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import './BrandNew.scss';

export const BrandNew = () => {
  const { phones, isLoading, isError } = useContext(PhoneContext);

  const brandNew = [...phones]
    .sort((a, b) => b.price - a.price);

  return (
    <section className="hot">
      <div className="container">
        <div className="brand__container">
          <div><h2 className="brand__title"> Brand new models </h2></div>
          <div className="brand__button">
            <button
              type="button"
              aria-label="Mute volume"
              className="hot__button brand__button--left"
            />
            <button
              type="button"
              aria-label="Mute volume"
              className="hot__button brand__button--right"
            />
          </div>
        </div>

        <div
          className="product"
        >
          <Swiper
            navigation={{
              nextEl: '.brand__button--right',
              prevEl: '.brand__button--left',
            }}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="swiper"
          >
            {brandNew.map(phone => (
              <SwiperSlide
                className="swiper-slider"
                key={phone.id}
              >
                <ProductCard phone={phone} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {!isLoading && isError && (
          <p>
            Something went wrong
          </p>
        )}
      </div>
    </section>
  );
};
