import { useAppContext } from "../../../context/AppContext";
import ProductCardItem from "../../ProductCard/ProductCardItem";

const HomeHotPrices = () => {
  const { phonesList, tabletsList, accessoriesList } = useAppContext();
  const itemsList = [...phonesList, ...tabletsList, ...accessoriesList].filter(
    (el) => el.priceDiscount / el.priceRegular < 0.85,
  );

  console.log(itemsList);

  return (
    <section>
      <h2 className="mb-6">Hot prices</h2>
      <section className="max-w-full overflow-hidden">
        <section
          style={{
            width: `${itemsList.length * (276 + 16) - 16}px`,
          }}
          className="grid grid-flow-col gap-8 outline outline-8 outline-green"
        >
          {itemsList.map((item) => (
            <ProductCardItem key={item.id} item={item} />
          ))}
        </section>
      </section>
    </section>
  );
};

export default HomeHotPrices;
