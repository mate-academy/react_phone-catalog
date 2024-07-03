import './HotPrices.scss';
import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export const HotPrices: React.FC = () => {
  return (
    <div className="hotprices">
      <h2 className="hotprices__title">Hot prices</h2>
    </div>
  );
};
