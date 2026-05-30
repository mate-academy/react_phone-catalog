import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Autoplay, Navigation } from "swiper/modules";
import { ProductsSlider } from "../../components/ProductsSlider";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./HomePage.module.scss";
import { ShopByCategory } from "../../components/ShopByCategory";
import { Product } from "../shared/types/Product";
import { PRODUCTS_API } from "../shared/constants/constants";
import { fetchUrl } from "../shared/FetchFunction/FetchFunction";


export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const data = await fetchUrl(PRODUCTS_API);

        const normalized = data.map((p: any) => ({
          ...p,
          productId: p.itemId,
        }));

        setProducts(normalized)
      } finally {
        setIsLoading(false)
      }
    };

    fetchProducts();
  }, []);

  const newModelsProducts = [...products].sort((a, b) => a.year - b.year);

  const hotPricesProducts = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));


  if (isLoading) return <p>Loading...</p>

  return (
    <>
    <div className={styles["home-page"]}>
      <h1 className={styles["swiper__title"]}>Welcome to Nice Gadgets store!</h1>
     <div className={styles["home-page__swiper-block"]}>
      <button className={`${styles["home-page__swiper-block__button"]} ${styles["home-page__swiper-block__button--lb"]} swiper-btn-prev`}>
        <img className={styles["home-page__swiper-block__button__left"]} src="./img/Chevron(Arrow-Right).png" alt="arrow" />
      </button>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: ".swiper-btn-prev",
          nextEl: ".swiper-btn-next",
        }}
        modules={[Pagination, FreeMode, Autoplay, Navigation]}
        className={styles["swiper"]}
      >
      <SwiperSlide className={styles["swiper__slide"]}><img className={styles["swiper__slide__img"]} src="./img/slider-image.png" alt="Photo 1"/></SwiperSlide>
      <SwiperSlide className={styles["swiper__slide"]}><img className={styles["swiper__slide__img"]} src="./img/slider-image2.jpeg" alt="Photo 2"/></SwiperSlide>
      <SwiperSlide className={styles["swiper__slide"]}><img className={styles["swiper__slide__img"]} src="./img/slider-image3.jpg" alt="Photo 3"/></SwiperSlide>
      </Swiper>
      <button className={`${styles["home-page__swiper-block__button"]} ${styles["home-page__swiper-block__button--rb"]} swiper-btn-next`}>
        <img className={styles["home-page__swiper-block__button__right"]} src="./img/Chevron(Arrow-Right).png" alt="arrow" />
      </button>
     </div>

      <div className={styles["home-page__slider"]}>
        <ProductsSlider title="Brand new models" products={newModelsProducts} hideFullPrice={true}/>
      </div>

      <ShopByCategory title={"Shop by category"} />

      <div className={styles["home-page__slider"]}>
        <ProductsSlider title="Hot prices" products={hotPricesProducts} hideFullPrice={false}/>
      </div>
    </div>
    </>
  )
}
