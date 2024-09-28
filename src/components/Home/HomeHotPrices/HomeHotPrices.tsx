import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import HomeHotPricesButtons from "./HomeHotPricesButtons";
import Slider from "../../../UI/Slider";

const HomeHotPrices = () => {
  const { productsList } = useAppContext();
  const [curElem, setCurElem] = useState<number>(0);
  const itemsList = productsList.filter((el) => el.price / el.fullPrice < 0.75);

  const handleStateChangeCurElem = (
    number: number | ((prev: number) => number),
  ) => {
    setCurElem(number);
  };

  return (
    <section>
      <section className="flex justify-between">
        <h2 className="mb-6">Hot prices</h2>
        {itemsList.length > 4 && (
          <HomeHotPricesButtons
            curElem={curElem}
            newProducts={itemsList}
            handleStateChangeCurElem={handleStateChangeCurElem}
          />
        )}
      </section>
      <Slider curElem={curElem} newProducts={itemsList} isSectHP={true} />
    </section>
  );
};

export default HomeHotPrices;
