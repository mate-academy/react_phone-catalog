import { useAppContext } from "../../../../context/AppContext";
import ProductCard from "../../../ProductCard/ProductCard";

const HomeNewProductsSlider = () => {
  const { phonesList, tabletsList, accessoriesList } = useAppContext();
  const itemsList = [...phonesList, ...tabletsList, ...accessoriesList];

  return (
    <section className="w-full">
      <div>
        {itemsList.map((phone) => (
          <ProductCard key={phone.id} item={phone} />
        ))}
      </div>
    </section>
  );
};

export default HomeNewProductsSlider;
