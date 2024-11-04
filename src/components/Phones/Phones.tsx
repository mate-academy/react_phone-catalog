import { useAppContext } from "../../context/AppContext";
import ProductsList from "../../UI/ProductsList";
import ProductHeader from "../../UI/ProductHeader";
import { useMemo } from "react";
import { SortType } from "../../types/sortType";
import { useLocation, useSearchParams } from "react-router-dom";

const Phones = () => {
  const { selectItemPerPage, selectSortBy, phonesList, sortList } =
    useAppContext();
  const sortTypeLocale = (localStorage.getItem("PhoneSelectSortBy") ||
    "Cheaper") as SortType;
  const itemsOnPageLocale = (localStorage.getItem("PhoneSelectSortBy") ||
    "Cheaper") as SortType;

  const locate = useLocation();
  
  const [searchParams, setSearchParams] = useSearchParams({
    sortBy: sortTypeLocale,
    itemPerPage: "4",
  });

  const sortBy: SortType = searchParams.get("sortBy") || "Cheaper";
  const itemPerPage = searchParams.get("itemPerPage") || "4";

  const sortedList = useMemo(
    () => sortList(phonesList, sortBy),
    [phonesList, sortBy, sortList],
  );

  console.log(searchParams, sortBy, sortedList);

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <ProductHeader
        name="Phones"
        itemList={phonesList}
        optionsItems={selectItemPerPage}
        optionsSorted={selectSortBy}
        localStItems="PhoneSelectItemPerPage"
        localStSort="PhoneSelectSortBy"
      />
      <ProductsList products={sortedList} />
    </section>
  );
};

export default Phones;
