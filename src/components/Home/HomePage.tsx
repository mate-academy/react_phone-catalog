import React from "react";
import styles from './HomePage.module.scss';
import { PhoneSwiper } from "../Swiper/PhoneSwiper";
import { BrandNewModels } from "../BrandNewModels/BrandNewModels";
import { ByCategory } from "../Category/ByCategory";
import { HotPrices } from "../HotPrices/HotPrices";

export const HomePage:React.FC = () => {
  return (
    <main className={styles.home}>
      <h2>Welcome to Nice Gadgets store!</h2>
      <PhoneSwiper/>

      <BrandNewModels />

      <ByCategory />

      <HotPrices />
    </main>
  )
}
