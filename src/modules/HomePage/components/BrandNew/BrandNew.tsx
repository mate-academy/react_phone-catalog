import { useRef } from "react";
import { ProductSlider } from "../../../shared/components/ProductSlider";
import { useAppSelector } from "../../../../app/store/hooks";

import styles from "./BrandNew.module.scss";

export const BrandNew = () => {
  const products = useAppSelector((state) => state.product.items);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);


  const newModelProduct = products.filter((product) => product.year >= 2022);

  return (
    <div className={styles.brandNew}>
      <div className={styles.brandNewTop}>
        <h2>Brand new models</h2>
        <div className={styles.brandNewTopButtonsContainer}>
          <div ref={prevRef} className={styles.brandNewBtnPrev} />
          <div ref={nextRef} className={styles.brandNewBtnNext} />
        </div>
      </div>
      <ProductSlider prevRef={prevRef} nextRef={nextRef} products={newModelProduct} />
    </div>
  );
};
