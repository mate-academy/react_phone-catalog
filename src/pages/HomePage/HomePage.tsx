import React, { useContext, useEffect, useMemo } from "react";
import { Slider } from "../../components/Slider";
import { ProductSlider } from "../../components/Product";
import { Sort } from "../../types/types";
import { loadData, selectProductsByCategory } from "../../utils";
import { CategoryList } from "../../components/CategoryList";
import {
  DispatchContext,
  StateContext,
} from "../../providers/GlobalStateProvider";
import styles from "./HomePage.module.scss";
import classNames from "classnames";
import { LoadingCard } from "../../components/LoadingCard";

export const HomePage: React.FC = () => {
  const { allProducts, isLoading } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: "START_LOADING" });

    loadData().then(data => {
      dispatch({ type: "SAVE_DATA", payload: data });
      dispatch({ type: "FINISH_LOADING" });
    });
  }, []);

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
      <h2 className={classNames(styles.title, "text-h1")}>
        Welcome to Nice Gadgets store!
      </h2>
      <Slider />
      {isLoading ? (
        <LoadingCard />
      ) : (
        <ProductSlider products={newest} title={"Brand new models"} />
      )}
      <CategoryList />
      <ProductSlider products={hotPrice} title={"Hot prices"} />
    </>
  );
};
