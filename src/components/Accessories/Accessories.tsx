import { useAppContext } from "../../context/AppContext";
import ProductHeader from "../../UI/ProductHeader";
import ProductsList from "../../UI/ProductsList";

const Accessories = () => {
  const { selectItemPerPage, selectSortBy, productsList } = useAppContext();
  const accessoriesList = productsList.filter(
    (el) => el.category === "accessories",
  );

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <ProductHeader
        name="Accessories"
        itemList={accessoriesList}
        optionsItems={selectItemPerPage}
        optionsSorted={selectSortBy}
        localStItems="AccessoriesSelectItemPerPage"
        localStSort="AccessoriesSelectSortBy"
      />
      <ProductsList products={accessoriesList} />
    </section>
  );
};

export default Accessories;
