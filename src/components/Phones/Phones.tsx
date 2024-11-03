import { useAppContext } from "../../context/AppContext";
import ProductsList from "../../UI/ProductsList";
import ProductHeader from "../../UI/ProductHeader";
import { useMemo } from "react";
import { SortType } from "../../types/sortType";
import { useLocation } from "react-router-dom";

const Phones = () => {
  const { selectItemPerPage, selectSortBy, phonesList, sortList } =
    useAppContext();
  const sortTypeLocale = (localStorage.getItem("PhoneSelectSortBy") ||
    "Cheaper") as SortType;

  const locate = useLocation();

  const sortedList = useMemo(
    () => sortList(phonesList, sortTypeLocale),
    [phonesList, sortTypeLocale],
  );

  console.log(sortedList, sortTypeLocale, locate);

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
