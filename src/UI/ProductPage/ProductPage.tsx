/* eslint-disable react-hooks/exhaustive-deps */
import { useAppContext } from "../../context/AppContext";
import ProductsList from "../../UI/ProductsList";
import ProductHeader from "../../UI/ProductPage/ProductHeader";
import { useEffect, useMemo } from "react";
import { SortType } from "../../types/sortType";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination/Pagination";
import { Product } from "../../types/product";

type Props = {
  productList: Product[];
  name: string;
};

const ProductPage = ({ productList, name }: Props) => {
  const { sortList } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const localStorageSort = name + "Sort";
  const localStorageItems = name + "Items";

  const sortBy: SortType =
    (searchParams.get("sortBy") as SortType) ||
    JSON.parse(localStorage.getItem(localStorageSort) as SortType) ||
    "Cheaper";
  const rawItemPerPage =
    searchParams.get("itemPerPage") ||
    JSON.parse(localStorage.getItem(localStorageItems) as string);
  const itemPerPage: number | "All" =
    rawItemPerPage === "All"
      ? "All"
      : rawItemPerPage
        ? parseInt(rawItemPerPage, 10)
        : 4;
  const currentPage: string = searchParams.get("currentPage") || "1";

  const sortedList = useMemo(
    () => sortList(productList, sortBy),
    [productList, sortBy, sortList],
  );

  const paginationMax = Math.ceil(
    productList.length / (typeof itemPerPage === "number" ? itemPerPage : 1),
  );

  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    setSearchParams(newParams);
  };

  const handleClickChangePage = (page: number) => {
    updateParams({ currentPage: page.toString() });
  };

  const numberOfItems = (page: number) => {
    if (itemPerPage === "All") {
      return sortedList;
    }

    return sortedList.slice((page - 1) * itemPerPage, itemPerPage * page);
  };

  const handleChangeItemPerPage = (value: string) => {
    if (+currentPage > Math.ceil(productList.length / +value)) {
      return updateParams({
        currentPage: Math.ceil(productList.length / +value).toString(),
        itemPerPage: value,
      });
    }

    updateParams({ itemPerPage: value });
  };

  const handleChangeSortType = (value: string) =>
    updateParams({ sortBy: value });

  useEffect(() => {
    updateParams({
      sortBy: JSON.parse(localStorage.getItem(localStorageSort) as SortType),
      itemPerPage: JSON.parse(
        localStorage.getItem(localStorageItems) as string,
      ),
      currentPage: "1",
    });
  }, []);

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <ProductHeader
        name={name}
        itemList={productList}
        onChangeItemPerPage={handleChangeItemPerPage}
        onChangeSortBy={handleChangeSortType}
        currentSortBy={sortBy}
        currentItemPerPage={itemPerPage.toString()}
      />
      <ProductsList products={numberOfItems(+currentPage)} />
      {itemPerPage !== "All" && (
        <Pagination
          selectedPage={+currentPage}
          onChange={handleClickChangePage}
          pages={paginationMax}
        />
      )}
    </section>
  );
};

export default ProductPage;
