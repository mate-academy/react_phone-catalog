import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard } from '../ProductCard/ProductCard';
import styles from "./ProductsSlider.module.scss";

interface Product {
  id: number;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  category: string;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  color: string;
  itemId: string;
}

interface Props {
  title: string;
  products: Product[];
  hideFullPrice?: boolean;
}


export const ProductsSlider: React.FC<Props> = ({ title, products, hideFullPrice }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles["wrapper__head"]}>
        <h2 className={styles["wrapper__head__title"]}>{title}</h2>
        <div className={styles["nav-wrapper"]}>
          <button ref={prevRef} className={`${styles["nav-button"]}`}>
            <img src="./img/Chevron(Arrow-Right).png" alt="arrow" className={`${styles["nav-button__icon"]} ${styles["nav-button--icon"]}`}/>
          </button>
          <button ref={nextRef} className={`${styles["nav-button"]}`}>
            <img src="./img/Chevron(Arrow-Right).png" alt="arrow" className={styles["nav-button__icon"]}/>
          </button>
        </div>
      </div>


      <div className={styles.slider}>
        <Swiper
          slidesPerView='auto'
          spaceBetween={16}
          modules={[Navigation]}
          navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          className={styles.swiper}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles["swiper__slide"]}>
              <ProductCard product={product} hideFullPrice={hideFullPrice}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
