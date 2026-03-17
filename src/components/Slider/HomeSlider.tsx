// import React from 'react';

// import { Pagination, Autoplay, Navigation } from 'swiper/modules';
// // import type { NavigationOptions } from 'swiper/types';
// import { Swiper, SwiperSlide } from 'swiper/react';
// // import { useRef } from 'react';
// import { icons } from '../utils/icons';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import '../styles/style.scss';

// import banner1 from '../imgSlider/Banner.png';
// import banner2 from '../imgSlider/Tablet.png';
// import banner3 from '../imgSlider/image.png';
// // import { ProductCard } from './ProductCard/ProductCard';
// // import { Pagination } from './Pagination';

// export const HomeSlider = () => {
//   // const prevRef = useRef<HTMLButtonElement | null>(null);
//   // const nextRef = useRef<HTMLButtonElement | null>(null);

//   return (
//     // <>
//     <div className="slider">
//       <button className="slider__btn swiper-prev">
//         <img src={icons.arrowIconLeft} alt="<" />
//       </button>

//       <Swiper
//         modules={[Pagination, Navigation]}
//         pagination={{ clickable: true }}
//         navigation={{
//           prevEl: '.swiper-prev',
//           nextEl: '.swiper-next',
//         }}
//         // autoplay={{ delay: 2000 }}
//         loop
//         className="home-slider"
//       >
//         <SwiperSlide>
//           <img src={banner1} alt="" />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img src={banner2} alt="" />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img src={banner3} alt="" />
//         </SwiperSlide>
//       </Swiper>
//       {/*
//     <Swiper>
//       <SwiperSlide>
//         <ProductCard></ProductCard>
//       </SwiperSlide>
//     </Swiper> */}

//       <button className="slider__btn swiper-next">
//         <img src={icons.arrowIconRight} alt=">" />
//       </button>
//     </div>
//   );
// };

import { Swiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { icons } from '../../utils/icons';
import React from 'react';

type Props = {
  children: React.ReactNode;
  breakpoints?: SwiperOptions['breakpoints'];
};

export const HomeSlider: React.FC<Props> = ({ children, breakpoints }) => {
  return (
    <>
      <div className="slider home-slider">
        <button className="home-prev slider__btn">
          <img src={icons.arrowIconLeft} alt="<" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: '.home-prev',
            nextEl: '.home-next',
          }}
          pagination={{
            clickable: true,
            el: '.home-pagination',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={breakpoints}
          loop
        >
          {children}
        </Swiper>

        <button className="home-next slider__btn">
          <img src={icons.arrowIconRight} alt=">" />
        </button>
      </div>

      <div className="home-pagination slider__pagination" />
    </>
  );
};
