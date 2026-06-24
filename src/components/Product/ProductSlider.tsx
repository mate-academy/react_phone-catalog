import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Card } from "../Card";
import styles from "./Product.module.scss";
import { ProductHeading } from "../ProductHeading";
import { Product } from "../../types/types";
import { BtnControls } from "../ProductHeading/ProductHeading";

interface Props {
  title: string;
  products: Array<Product>;
}

const numberOfDisplayedItems = 4;

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [swiperButtonState, setSwiperButtonState] = useState<BtnControls>({
    allowLeft: false,
    allowRight: false,
  });

  const handleButtons = (swiper: SwiperType) => {
    setSwiperButtonState({
      allowLeft: swiper.activeIndex > 0,
      allowRight: products.length - numberOfDisplayedItems > swiper.activeIndex,
    });
  };

  const handleSwip = (swiper: SwiperType) => {
    handleButtons(swiper);
    swiperRef.current = swiper;
  };

  return (
    <section className={styles.products}>
      <ProductHeading
        swiperRef={swiperRef}
        title={title}
        productsLength={products.length}
        swiperButtonState={swiperButtonState}
      />
      <Swiper
        slidesPerView={numberOfDisplayedItems}
        spaceBetween={16}
        className={styles.slider}
        onSlideChange={handleButtons}
        onSwiper={handleSwip}
      >
        {products.map(product => (
          <SwiperSlide key={product.name} className={styles.slide}>
            <Card {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
