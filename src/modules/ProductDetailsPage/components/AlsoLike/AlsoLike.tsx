import { useRef } from "react";

import { useAppSelector } from "../../../../app/store/hooks";
import { ProductSlider } from "../../../shared/components/ProductSlider";

import styles from "./AlsoLike.module.scss";

export const AlsoLike = () => {
  const products = useAppSelector((state) => state.product.items);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const LIMIT = 7;

  const phones = products
    .filter((p) => p.category === "phones")
    .slice(0, LIMIT);
  const tablets = products
    .filter((p) => p.category === "tablets")
    .slice(0, LIMIT);
  const accessories = products
    .filter((p) => p.category === "accessories")
    .slice(0, LIMIT);

  const alsoLikeProduct = shuffleArray([...phones, ...tablets, ...accessories]);

  return (
    <div className={styles.alsoLike}>
      <div className={styles.alsoLikeTop}>
        <h2>You may also like</h2>
        <div className={styles.alsoLikeTopButtonsContainer}>
          <div ref={prevRef} className={styles.alsoLikeBtnPrev} />
          <div ref={nextRef} className={styles.alsoLikeBtnNext} />
        </div>
      </div>
      <ProductSlider
        prevRef={prevRef}
        nextRef={nextRef}
        products={alsoLikeProduct}
        showFullPrice={true}
      />
    </div>
  );
};

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
