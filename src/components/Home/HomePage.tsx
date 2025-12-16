import React from "react";
import styles from './HomePage.module.scss';
import { PhoneSwiper } from "../Swiper/PhoneSwiper";

export const HomePage:React.FC = () => {
  return (
    <main className={styles.home}>
      <h2>Welcome to Nice Gadgets store!</h2>
      <PhoneSwiper/>
    </main>
  )
}
