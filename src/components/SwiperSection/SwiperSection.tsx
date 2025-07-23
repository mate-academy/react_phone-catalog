// import { PhoneCard } from '../PhoneCard';
// import './swiperSection.scss';

// export const SwiperSection: React.FC = () => {
//   return (
//     <div className="swiper-section-wrapper">
//       <div className='title-swiper-container'>
//         <h2>Brand new models</h2>
//         <div className='mini-swiper'></div>
//       </div>

//       <div className="swiperSection">
//         <PhoneCard />
//       </div>
//     </div>
//   );
// };

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { PhoneCard } from '../PhoneCard'; // путь к твоему компоненту

export const SwiperSection: React.FC = () => {
  // ссылки на кастомные стрелки
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="swiper-section-wrapper">
      <div className='title-swiper-container'>
        <h2>Brand new models</h2>

        <div className='mini-swiper'>
          <div ref={prevRef} className="arrow arrow--left">←</div>
          <div ref={nextRef} className="arrow arrow--right">→</div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Привязываем стрелки к swiper
          if (swiper.params.navigation) {
            (swiper.params.navigation as any).prevEl = prevRef.current;
            (swiper.params.navigation as any).nextEl = nextRef.current;
          }
        }}
        className="swiperSection"
      >
        <SwiperSlide><PhoneCard /></SwiperSlide>
        <SwiperSlide><PhoneCard /></SwiperSlide>
        <SwiperSlide><PhoneCard /></SwiperSlide>
        {/* Добавь столько карточек, сколько хочешь */}
      </Swiper>
    </div>
  );
};
