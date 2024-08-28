import { useAppContext } from "../../context/AppContext";
import ProductHeader from "../../UI/ProductHeader";
import ProductsList from "../../UI/ProductsList";

const Tablets = () => {
  const { selectItemPerPage, selectSortBy, productsList } = useAppContext();
  const tabletsList = productsList.filter((el) => el.category === "tablets");

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <ProductHeader
        name="Tablets"
        itemList={tabletsList}
        optionsItems={selectItemPerPage}
        optionsSorted={selectSortBy}
        localStItems="TabletsSelectItemPerPage"
        localStSort="TabletsSelectSortBy"
      />
      <ProductsList products={tabletsList} />
    </section>
  );
};

export default Tablets;
