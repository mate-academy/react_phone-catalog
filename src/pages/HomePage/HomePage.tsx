import React, { useContext, useMemo } from "react";
import { Slider } from "../../components/Slider";
import { ProductSlider } from "../../components/Product";
import { Sort } from "../../types/types";
import { selectProductsByCategory } from "../../utils";
import { CategoryList } from "../../components/CategoryList";
import { StateContext } from "../../providers/GlobalStateProvider";
import styles from "./HomePage.module.scss";
import classNames from "classnames";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { LoadingCard } from "../../components/LoadingCard";

export const HomePage: React.FC = () => {
  const { allProducts } = useContext(StateContext);
  const { labels } = useContext(AppSettingsContext);

  const newest = useMemo(
    () =>
      selectProductsByCategory({
        products: allProducts,
        sort: Sort.Newest,
      }),
    [allProducts],
  );

  const hotPrice = useMemo(
    () =>
      selectProductsByCategory({
        products: allProducts,
        sort: Sort.Cheapest,
      }),
    [allProducts],
  );

  return (
    <>
      <h2 className={classNames(styles.title, "text-h1")}>{labels.welcome}</h2>
      <Slider />
      {allProducts.length === 0 ? (
        <LoadingCard />
      ) : (
        <>
          <ProductSlider products={newest} title={labels.brandNewModels} />
          <CategoryList />
          <ProductSlider products={hotPrice} title={labels.hotPrices} />
        </>
      )}
    </>
  );
};
