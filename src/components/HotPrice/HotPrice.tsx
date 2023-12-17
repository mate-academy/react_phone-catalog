import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import { useContext } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { PhoneContext } from '../Context/contex';
import './hotPrice.scss';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

export const HotPrice = () => {
  const { phones } = useContext(PhoneContext);
  const hotPricePhones = [...phones]
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));

  return (
    <section className="hot">
      <div className="container">
        <div className="hot__container">
          <h2 className="hot__title"> Hot prices </h2>
          <div className="hot__button">
            <button
              type="button"
              aria-label="Mute volume"
              className="hot__button hot__button--left"
            />
            <button
              type="button"
              aria-label="Mute volume"
              className="hot__button hot__button--right"
            />
          </div>
        </div>
        <div
          className="product"
        >
          <Swiper
            data-cy="cardsContainer"
            navigation={{
              nextEl: '.hot__button--right',
              prevEl: '.hot__button--left',
            }}
            slidesPerView={1}
            spaceBetween={40}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="hot__swiper"
          >
            {hotPricePhones.map(phone => (
              <SwiperSlide
                className="swiper-slider"
                key={phone.id}
              >
                <ProductCard phone={phone} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HotPrice;
