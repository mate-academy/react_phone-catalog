import React, { type RefObject } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../ProductCard";

import styles from "./ProductSlider.module.scss";
import { Navigation } from "swiper/modules";
import type { Product } from "../../types/Product";


type Props = {
  prevRef: RefObject<HTMLDivElement | null>;
  nextRef: RefObject<HTMLDivElement | null>;
  products: Product[];
  showFullPrice?: boolean;
};

export const ProductSlider: React.FC<Props> = ({ prevRef, nextRef, products, showFullPrice }) => {
  return (
    <div className={styles.productSliderWrapper}>
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.4,
            spaceBetween: 16,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1201: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        speed={800}
        centeredSlides={false}
        slidesPerView={"auto"}
        className={styles.mySwiper}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
