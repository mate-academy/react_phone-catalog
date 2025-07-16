
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="custom-buttons">
      <button onClick={() => swiper.slidePrev()}>Попередній</button>
      <button onClick={() => swiper.slideNext()}>Наступний</button>
    </div>
  );
};

export default function MainSwiper() {
  const banner = [
    '/img/banner/Pro.png',
    '/img/banner/watch.jpg',
    '/img/banner/headphones.png',
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]} // Добавили Autoplay
      spaceBetween={50}
      slidesPerView={1} // Один слайд за раз
      loop={true} // Включили зацикливание
      autoplay={{
        delay: 5000, // Автоматическая прокрутка каждые 3 секунды
        disableOnInteraction: false, // НЕ останавливать автопрокрутку после ручного взаимодействия
      }}
      navigation={false} // Встроенные кнопки не используем
      pagination={{ clickable: true }}
      className="mySwiper"
    >
      <SwiperButtons />

      {banner.map((url, index) => (
        <SwiperSlide key={index}>
          <div
            className="card"
            style={{
              backgroundImage: `url(${url})`,
            }}
          >
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}







