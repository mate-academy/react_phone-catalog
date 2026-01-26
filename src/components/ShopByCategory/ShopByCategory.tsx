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
        <div className={`${styles["category__photo"]} ${styles["category__photo--purple"]}`}>
          <img src="./img/category-phones.png" alt="photo" className={`${styles["category__photo__image"]} ${styles["category__photo__image--phones"]}`} />
        </div>
        <NavLink to="/phones" className={styles["category__link"]}>Mobile phones</NavLink>
        <p className={styles["category__qnt"]}>95 models</p>
      </div>
      <div className={styles["category__block"]}>
        <div className={`${styles["category__photo"]} ${styles["category__photo--grey"]}`}>
          <img src="./img/category-tablets.png" alt="photo" className={`${styles["category__photo__image"]} ${styles["category__photo__image--tablets"]}`}/>
        </div>
        <NavLink to="/tablets" className={styles["category__link"]}>Tablets</NavLink>
        <p className={styles["category__qnt"]}>24 models</p>
      </div>
      <div className={styles["category__block"]}>
        <div className={`${styles["category__photo"]} ${styles["category__photo--red"]}`}>
          <img src="./img/category-accessories.png" alt="photo" className={`${styles["category__photo__image"]} ${styles["category__photo__image--accessories"]}`}/>
        </div>
        <NavLink to="/accessories" className={styles["category__link"]}>Accessories</NavLink>
        <p className={styles["category__qnt"]}>100 models</p>
      </div>
    </div>
    </>
  )
}
