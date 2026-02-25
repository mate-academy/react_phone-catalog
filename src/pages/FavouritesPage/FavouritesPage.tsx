import React, { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BreadCrumbs } from "../../components/Breadcrumbs";
import { StateContext } from "../../providers/GlobalStateProvider";
import { Card } from "../../components/Card";
import { NoProducts } from "../../components/NoProducts";
import styles from "./FavouritesPage.module.scss";
import classNames from "classnames";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { LoadingCard } from "../../components/LoadingCard";

export const FavouritesPage: React.FC = () => {
  const { favoriteIds, allProducts } = useContext(StateContext);
  const { labels } = useContext(AppSettingsContext);
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim().toLowerCase();

  const favoriteProducts = useMemo(() => {
    return allProducts.filter(product =>
      favoriteIds.find(obj => obj.id === product.id),
    );
  }, [allProducts, favoriteIds]);

  const visibleProducts = useMemo(() => {
    if (!query) {
      return favoriteProducts;
    }

    return favoriteProducts.filter(product =>
      product.name.toLowerCase().includes(query),
    );
  }, [favoriteProducts, query]);

  if (allProducts.length === 0) {
    return <LoadingCard />;
  }

  return favoriteIds.length !== 0 ? (
    <>
      <section className={styles.favorites}>
        <div className={styles.container}>
          <BreadCrumbs />
          <div className={styles.content}>
            <h2 className="text-h1">{labels.favorites}</h2>
            <p className="text-small">
              {visibleProducts.length === 0
                ? ""
                : labels.itemCount(visibleProducts.length)}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.products}>
        {query && visibleProducts.length === 0 ? (
          <NoProducts message={labels.searchNoMatchProducts} />
        ) : (
          <ul className={classNames("grid-list", styles.grid)}>
            {visibleProducts.map(
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
        )}
      </section>
    </>
  ) : (
    <NoProducts />
  );
};
