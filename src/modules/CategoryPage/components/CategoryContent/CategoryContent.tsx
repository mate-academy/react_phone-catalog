import { FilterSelect } from "./FilterSelect";
import { ProductList } from "../../../shared/components/ProductList";
import { Pagination } from "./Pagination";
import { useParams, useSearchParams } from "react-router-dom";

import {
  sortMappingOptionsToQueryParamValue,
  itemsMappingOptionsToQueryParamValue,
} from "../../constants/filterOptions";
import { useAppSelector } from "../../../../app/store/hooks";

import {
  selectPaginatedProducts,
  selectProductsByCategory,
} from "../../../../app/store/selectors/productSelectors";

import styles from "./CategoryContent.module.scss";

export const CategoryContent = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "age";
  const itemsPerPage = Number(searchParams.get("perPage") || "16");
  const currentPage = Number(searchParams.get("page") || "1");

  const filteredProduct = useAppSelector((state) =>
    selectProductsByCategory(state, categoryName)
  );

  const paginatedProducts = useAppSelector((state) =>
    selectPaginatedProducts(
      state,
      categoryName,
      sort,
      currentPage,
      itemsPerPage
    )
  );

  return (
    <>
      <div className={styles.filters}>
        <FilterSelect
          options={sortMappingOptionsToQueryParamValue}
          variant={"sort"}
        />
        <FilterSelect
          options={itemsMappingOptionsToQueryParamValue}
          variant={"items"}
        />
      </div>
      <ProductList products={paginatedProducts} />
      <Pagination products={filteredProduct} />
    </>
  );
};
