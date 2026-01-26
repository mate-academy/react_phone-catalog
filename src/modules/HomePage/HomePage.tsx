import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Autoplay } from "swiper/modules";
import { ProductsSlider } from "../../components/ProductsSlider";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./HomePage.module.scss";
import { ShopByCategory } from "../../components/ShopByCategory";

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  color: string;

}


export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async (): Promise<Product[]> => {
      const urls = [
        '/api/phones.json',
        '/api/accessories.json',
        '/api/tablets.json'
      ];

      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));
      return data.flat();
    };

    const loadData = async () => {
      try {
        const allProducts = await fetchAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const phones = products.filter(p => p.category === 'phones');

  const unifiedProducts = phones.map(product => ({
  ...product,
  image: (product as any).images?.[0] || product.image,
  price: (product as any).priceDiscount || product.price,
  fullPrice: (product as any).priceRegular || product.fullPrice,
  }));

  const hotPricesProducts = [...unifiedProducts]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));


  if (isLoading) return <p>Loading...</p>

  return (
    <>
    <div className={styles["home-page"]}>
      <h1 className={styles["swiper__title"]}>Welcome to Nice Gadgets store!</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, FreeMode, Autoplay]}
        className={styles["swiper"]}
      >
      <SwiperSlide className={styles["swiper__slide"]}><img src="./img/slider-image.png" alt="Photo 1"/></SwiperSlide>
      <SwiperSlide className={styles["swiper__slide"]}><img src="./img/slider-image2.jpeg" alt="Photo 2"/></SwiperSlide>
      <SwiperSlide className={styles["swiper__slide"]}><img src="./img/slider-image3.jpg" alt="Photo 3"/></SwiperSlide>
      </Swiper>

      <ProductsSlider title="Brand new models" products={unifiedProducts} hideFullPrice={true}/>

      <ShopByCategory title={"Shop by category"} />

      <ProductsSlider title="Hot prices" products={hotPricesProducts} hideFullPrice={false}/>
    </div>
    </>
  )
}
