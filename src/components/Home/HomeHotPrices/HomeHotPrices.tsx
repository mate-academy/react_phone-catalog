import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import ProductCardItem from "../../ProductCard/ProductCardItem";
import HomeHotPricesButtons from "./HomeHotPricesButtons";

const HomeHotPrices = () => {
  const { phonesList, tabletsList, accessoriesList } = useAppContext();
  const [curElem, setCurElem] = useState<number>(4);
  const itemsList = [...phonesList, ...tabletsList, ...accessoriesList].filter(
    (el) => el.priceDiscount / el.priceRegular < 0.85,
  );

  const handleStateChangeCurElem = (
    number: number | ((prev: number) => number),
  ) => {
    setCurElem(number);
  };

  const containerSize = 276 + 32;

  console.log(itemsList);

  return (
    <section>
      <section className="flex justify-between">
        <h2 className="mb-6">Hot prices</h2>
        <HomeHotPricesButtons
          curElem={curElem}
          itemsList={itemsList}
          handleStateChangeCurElem={handleStateChangeCurElem}
        />
      </section>
      <section className="max-w-full overflow-hidden">
        <section
          style={{
            width: `${itemsList.length * (276 + 32) - 32}px`,
            transform: `translateX(-${containerSize * curElem}px)`,
          }}
          className="grid grid-flow-col gap-8 outline outline-8 outline-green duration-150"
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
