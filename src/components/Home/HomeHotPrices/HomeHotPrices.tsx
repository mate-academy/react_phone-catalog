import { useAppContext } from "../../../context/AppContext";
import ProductCard from "../../ProductCard/ProductCard";

const HomeHotPrices = () => {
  const { phonesList, tabletsList, accessoriesList } = useAppContext();
  const itemsList = [...phonesList, ...tabletsList, ...accessoriesList].filter(
    (el) => el.priceDiscount / el.priceRegular < 0.85,
  );

  console.log(itemsList);

  return (
    <section>
      <h2 className="mb-6">Hot prices</h2>
      <div className="flex flex-col gap-4">
        {itemsList.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default HomeHotPrices;
