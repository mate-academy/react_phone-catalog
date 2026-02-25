import React, { useContext, useMemo } from "react";
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

export const CatalogPage: React.FC<{ category: Category }> = ({ category }) => {
  const { allProducts } = useContext(StateContext);
  const { setSort, sortValue } = useSort();

  const currentProducts = useMemo(() => {
    return filterAndSort({
      products: allProducts,
      category,
      sort: sortValue as Sort,
    });
  }, [category, allProducts, sortValue, setSort]);

  const { perPage, setPerPage } = usePerPage(allProducts.length);
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
  }, [currentPage, perPage, totalPages, setPage, setPerPage]);

  return (
    <>
      {currentProducts.length === 0 ? (
        <NoProducts text={category} />
      ) : (
        <main className="main">
          <BreadCrumbs />
          <Filter
            setPerPage={setPerPage}
            perPage={perPage}
            setSort={setSort}
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
            setPerPage={setPerPage}
          />
        </main>
      )}
    </>
  );
};
