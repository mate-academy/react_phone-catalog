import { useAppContext } from "../../context/AppContext";
import ProductsList from "../../UI/ProductsList";
import ProductHeader from "../../UI/ProductHeader";

const Phones = () => {
  const { selectItemPerPage, selectSortBy, productsList } = useAppContext();
  const phoneList = productsList.filter((el) => el.category === "phones");

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <ProductHeader
        name="Phones"
        itemList={phoneList}
        optionsItems={selectItemPerPage}
        optionsSorted={selectSortBy}
        localStItems="PhoneSelectItemPerPage"
        localStSort="PhoneSelectSortBy"
      />
      <ProductsList products={phoneList} />
    </section>
  );
};

export default Phones;
