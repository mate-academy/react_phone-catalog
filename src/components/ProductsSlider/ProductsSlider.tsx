import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
// import { ProductCard } from '../ProductCard';
import React, { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import ArrowButton from '../ArrowButton/ArrowButton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './style.css';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  visibleProducts: Product[];
};

// import required modules
// import { Pagination } from 'swiper';

export const ProductsSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        // modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

// export const ProductsSlider: React.FC<Props> = ({ title, visibleProducts }) => {
//   const [currSlide, setCurrSlide] = useState(0);
//   const swiperRef = useRef<SwiperType | null>(null);

//   const isNewModelsBlock = title === 'Brand new models';

//   const handleClickArrow = (direction: string) => {
//     if (direction === 'left') {
//       if (swiperRef.current) swiperRef.current.slidePrev();
//     } else {
//       if (swiperRef.current) swiperRef.current.slideNext();
//     }
//   };

//   const isPrevBtnDisabled = currSlide === 0;
//   const isNextBtnDisabled = currSlide === visibleProducts.length - 1;

//   return (
//     <div className={styles.slider}>
//       <div className={styles.slider__header}>
//         <h2 className={styles.title}>{title}</h2>
//         <div className={styles.slider__buttons}>
//           <ArrowButton
//             direction="left"
//             handleClickArrow={handleClickArrow}
//             isBtnDisabled={isPrevBtnDisabled}
//           />
//           <ArrowButton
//             direction="right"
//             handleClickArrow={handleClickArrow}
//             isBtnDisabled={isNextBtnDisabled}
//           />
//         </div>
//       </div>
//       <Swiper
//         spaceBetween={20}
//         onSlideChange={swiper => setCurrSlide(swiper.activeIndex)}
//         onSwiper={swiper => (swiperRef.current = swiper)}
//         watchOverflow={true}
//         breakpoints={{
//           0: {
//             slidesPerView: 1.5,
//           },
//           380: {
//             slidesPerView: 1.5,
//           },
//           480: {
//             slidesPerView: 2,
//           },
//           580: {
//             slidesPerView: 2.5,
//           },
//           780: {
//             slidesPerView: 3,
//           },
//           1000: {
//             slidesPerView: 4,
//           },
//           1200: {
//             slidesPerView: 4,
//           },
//         }}
//       >
//         {visibleProducts.map(product => (
//           <SwiperSlide key={product.id}>
//             <ProductCard
//               product={product}
//               isNewModelsBlock={isNewModelsBlock}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };
