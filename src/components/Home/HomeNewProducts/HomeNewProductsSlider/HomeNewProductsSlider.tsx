import { useAppContext } from "../../../../context/AppContext";
import ProductCard from "../../../ProductCard/ProductCard";

const HomeNewProductsSlider = () => {
  const { phonesList, tabletsList, accessoriesList } = useAppContext();
  const itemsList = [...phonesList, ...tabletsList, ...accessoriesList];

  return (
    <section className="w-full overflow-hidden">
      <section
        style={{
          width: `${itemsList.length * (276 + 16) - 16}px`,
        }}
        className="grid grid-flow-col gap-8"
      >
        {itemsList.map((phone) => (
          <ProductCard key={phone.id} item={phone} />
        ))}
      </section>
    </section>
  );
};

export default HomeNewProductsSlider;
