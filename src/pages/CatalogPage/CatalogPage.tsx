import React, { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BreadCrumbs } from "../../components/Breadcrumbs";
import styles from "./CatalogPage.module.scss";

import { Card } from "../../components/Card";
import { Pagination } from "../../components/Pagination";
import { Filter } from "../../components/Filter";
import { usePagination, usePerPage, useSort } from "../../hooks/hooks";
import { StateContext } from "../../providers/GlobalStateProvider";
import { Category, Sort } from "../../types/types";
import { filterAndSort } from "../../utils";
import { NoProducts } from "../../components/NoProducts";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { LoadingCard } from "../../components/LoadingCard";

export const CatalogPage: React.FC<{ category: Category }> = ({ category }) => {
  const { allProducts } = useContext(StateContext);
  const { labels } = useContext(AppSettingsContext);
  const { setSort, sortValue } = useSort();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim().toLowerCase();

  const categoryProducts = useMemo(() => {
    return filterAndSort({
      products: allProducts,
      category,
      sort: sortValue as Sort,
    });
  }, [category, allProducts, sortValue]);

  const currentProducts = useMemo(() => {
    if (!query) {
      return categoryProducts;
    }

    return categoryProducts.filter(product =>
      product.name.toLowerCase().includes(query),
    );
  }, [categoryProducts, query]);

  const { perPage, setPerPage } = usePerPage(currentProducts.length);
  const currentProductLength = currentProducts.length;

  const { currentPage, totalPages, setPage } = usePagination(
    currentProductLength,
    perPage,
  );

  const visibleProducts = useMemo(() => {
    const page = currentPage - 1;
    const start = page * perPage;
    const end = start + perPage;

    return currentProducts.slice(start, end);
  }, [currentPage, perPage, currentProducts]);

  return (
    <>
      {allProducts.length === 0 ? (
        <LoadingCard />
      ) : categoryProducts.length === 0 ? (
        <NoProducts text={category} />
      ) : query && currentProducts.length === 0 ? (
        <NoProducts message={labels.searchNoMatchCategory(category)} />
      ) : (
        <main className="main">
          <BreadCrumbs />
          <Filter
            setPerPage={setPerPage}
            perPage={perPage}
            setSort={setSort}
            sortValue={sortValue}
            count={currentProductLength}
          />
          <section className={styles.products}>
            <ul className="grid-list">
              {visibleProducts.map(
                ({ id, name, price, screen, ram, image, capacity }) => (
                  <Card
                    id={id}
                    key={name + price}
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
          <Pagination
            totalPages={totalPages}
            setPage={setPage}
            currentPage={currentPage}
          />
        </main>
      )}
    </>
  );
};
