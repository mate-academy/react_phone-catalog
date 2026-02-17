import { NavLink } from "react-router-dom";
import styles from "./ShopByCategory.module.scss";

interface Props {
  title: string
}

export const ShopByCategory: React.FC<Props> = ({title}) => {
  return (
    <>
    <div className={styles["category"]}>
      <h2 className={styles["category__title"]}>{title}</h2>
      <div className={styles["category__block"]}>
        <NavLink to="/phones" className={styles["category__link"]}>
          <div className={`${styles["category__photo"]} ${styles["category__photo--purple"]}`}>
            <img src="./img/category-phones.png" alt="photo" className={`${styles["category__photo__image"]} ${styles["category__photo__image--phones"]}`} />
          </div>
          <p className={styles["category__link__name"]}>Mobile phones</p>
          <p className={styles["category__qnt"]}>95 models</p>
        </NavLink>
      </div>
      <div className={styles["category__block"]}>
        <NavLink to="/tablets" className={styles["category__link"]}>
          <div className={`${styles["category__photo"]} ${styles["category__photo--grey"]}`}>
            <img src="./img/category-tablets.png" alt="photo" className={`${styles["category__photo__image"]} ${styles["category__photo__image--tablets"]}`}/>
          </div>
          <p className={styles["category__link__name"]}>Tablets</p>
          <p className={styles["category__qnt"]}>24 models</p>
        </NavLink>
      </div>
      <div className={styles["category__block"]}>
        <NavLink to="/accessories" className={styles["category__link"]}>
          <div className={`${styles["category__photo"]} ${styles["category__photo--red"]}`}>
            <img src="./img/category-accessories.png" alt="photo" className={`${styles["category__photo__image"]} ${styles["category__photo__image--accessories"]}`}/>
          </div>
          <p className={styles["category__link__name"]}>Accessories</p>
          <p className={styles["category__qnt"]}>100 models</p>
        </NavLink>
      </div>
    </div>
    </>
  )
}
