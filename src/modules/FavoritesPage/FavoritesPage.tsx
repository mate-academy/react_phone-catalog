import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { ProductCard } from "../../components/ProductCard";
import styles from "./FavoritesPage.module.scss";
import { NavLink } from "react-router-dom";

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);


  if (favorites.length === 0) {
    return <h2 className={styles["favorites-empty"]}>Favourites empty</h2>
  }

  return (
    <>
      <div className={styles["favorites-page"]}>
        <div className={styles["favorites-page__navi"]}>
          <NavLink to="/" className={styles["favorites-page__block"]}>
            <img src="./img/home.png" alt="logo" className={styles["favorites-page__logo"]}/>
          </NavLink>
          <img src="./img/r-shevron.png" alt="logo" className={styles["favorites-page__arrow"]}/>
          <p className={styles["favorites-page__page"]}>Favourites</p>
        </div>
        <h1 className={styles["favorites-page__title"]}>Favourites</h1>
        <p className={styles["favorites-page__quantity"]}>{favorites.length} items</p>
        <div className={styles["favorites-page__favorites"]}>
          {favorites.map((favorite) => (
          <ProductCard product={favorite}/>
          ))}
        </div>
      </div>
    </>
  )
}
