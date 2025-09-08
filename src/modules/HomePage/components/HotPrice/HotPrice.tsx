import React, { useRef } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { ProductSlider } from "../../../shared/components/ProductSlider";

import styles from "./HotPrice.module.scss";

export const HotPrice = () => {
  const products = useAppSelector((state) => state.product.items);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const hotPriceProduct = products
    .filter(
      (product) =>
        product.year >= 2021 && product.fullPrice - product.price >= 85
    )
    .sort((prod1, prod2) => prod2.price - prod1.price);

  return (
    <div className={styles.hotPrice}>
      <div className={styles.hotPriceTop}>
        <h2>Hot prices</h2>
        <div className={styles.hotPriceTopButtonsContainer}>
          <div ref={prevRef} className={styles.hotPriceBtnPrev} />
          <div ref={nextRef} className={styles.hotPriceBtnNext} />
        </div>
      </div>
      <ProductSlider
        prevRef={prevRef}
        nextRef={nextRef}
        products={hotPriceProduct}
        showFullPrice={true}
      />
    </div>
  );
};
