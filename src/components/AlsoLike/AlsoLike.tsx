import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import { useContext } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { PhoneContext } from '../Context/contex';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import './AlsoLike.scss';

export const AlsoLike = () => {
  const { phones, isLoading, isError } = useContext(PhoneContext);
  const likePhones = phones.filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <div className="like">
      <div className="like__container">
        <h2 className="like__title"> You may also like </h2>
        <div className="like__button">
          <button
            type="button"
            aria-label="Mute volume"
            className="like__button like__button--left"
          />
          <button
            type="button"
            aria-label="Mute volume"
            className="like__button like__button--right"
          />
        </div>
      </div>

      <div
        className="product"
      >
        <Swiper
          navigation={{
            nextEl: '.like__button--right',
            prevEl: '.like__button--left',
          }}
          spaceBetween={20}
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
            },
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="swiper"
        >
          {likePhones.map(phone => (
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
  );
};
