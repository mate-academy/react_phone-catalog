import React, { useContext, useMemo } from "react";
import { BreadCrumbs } from "../../components/Breadcrumbs";
import { StateContext } from "../../providers/GlobalStateProvider";
import { Card } from "../../components/Card";
import { NoProducts } from "../../components/NoProducts";
import styles from "./FavouritesPage.module.scss";

export const FavouritesPage: React.FC = () => {
  const { favoriteIds, allProducts } = useContext(StateContext);

  const favoriteProducts = useMemo(() => {
    return allProducts.filter(product =>
      favoriteIds.find(obj => obj.id === product.id),
    );
  }, [allProducts, favoriteIds]);
  return favoriteIds.length !== 0 ? (
    <>
      <section className="favorites">
        <div className="favorites__container">
          <BreadCrumbs />
          <div className="favorites__content">
            <h2 className="favorites__title text-h1">Favorites</h2>
            <p className="favorites__subtitle text-small">
              {favoriteProducts.length === 0
                ? ""
                : `${favoriteProducts.length < 2 ? favoriteProducts.length + " item" : favoriteProducts.length + " items"}`}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.products}>
        <ul className="grid-list favorites-grid-list">
          {favoriteProducts.map(
            ({ id, name, price, screen, ram, image, capacity }) => (
              <Card
                key={id}
                id={id}
                name={name}
                price={price}
                screen={screen}
                ram={ram}
                image={image}
                capacity={capacity}
              />
            ),
          )}
        </ul>
      </section>
    </>
  ) : (
    <NoProducts />
  );
};
