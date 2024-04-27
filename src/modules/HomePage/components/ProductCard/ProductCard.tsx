import React from "react";
// import { getBrandNewProducts, getHotPriceProducts } from "../../../../api/sortProduct";
// import { useAppSelector } from "../../../../app/hooks"
import styles from './ProductCard.module.scss';
import { Products } from "../../../../types/Product";
type Props = {
  phone: Products
}
export const ProductCard:React.FC<Props> = ({ phone }) => {

  // const sortProduct = chosenSort 
  //   ? getBrandNewProducts(product)
  //   : getHotPriceProducts(product)
  // console.log(product)
  // console.log(sortProduct)


  return (  
    <div 
      className={styles.phone__container}
      id="phoneWidth"
    >
      <div className={styles.phone__wraper}>
        <a>
          <img
            className={styles.phone__img}
            src={phone.image} alt="" />
        </a>
        <p className={styles.phone__title}>
          {phone.name}
        </p>
        <div className={`${styles.phone__price} ${styles.container}`}>
          <h2 className={styles.phone__price}>
            {`$${phone.price}`}
          </h2>
          {true && (
            <h2 className={styles.phone__discount}>
              {`$${phone.fullPrice}`}
            </h2>
          )}

        </div>
        <span className={styles.phone__line}></span>
        <div className={`${styles.phone__descriptin} ${styles.phone__display}`}>
          <div className={styles.phone__descriptin}>
            <p className={styles.phone__part}>
              Screen
            </p>

            <p className={`${styles.phone__part} ${styles.phone__value}`}>
              {phone.screen}
            </p>
          </div>
          <div className={styles.phone__descriptin}>
            <p className={styles.phone__part}>
              Capacity
            </p>

            <p className={`${styles.phone__part} ${styles.phone__value}`}>
              {phone.capacity}
            </p>
          </div>

          <div className={styles.phone__descriptin}>
            <p className={styles.phone__part}>
              RAM
            </p>

            <p className={`${styles.phone__part} ${styles.phone__value}`}>
              {phone.ram}
            </p>
          </div>
        </div>
        <div className={styles.phone__send}>
          <button className={styles.phone__button}>
            Add to cart
          </button>

          <div className={styles.phone__like}>
            <a className={styles.phone__favorit} href=""></a>
          </div>
        </div>
      </div>
    </div>
  );
};
