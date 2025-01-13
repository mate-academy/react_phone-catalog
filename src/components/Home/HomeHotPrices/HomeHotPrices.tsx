import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import HomeHotPricesButtons from "./HomeHotPricesButtons";
import Slider from "../../../UI/Slider";
import useWindowSize from "../../../hooks/useWindowSize.hook";

const HomeHotPrices = () => {
  const { productsList } = useAppContext();
  const [curElem, setCurElem] = useState<number>(0);
  const itemsList = productsList.filter((el) => el.fullPrice - el.price > 100);
  const { width } = useWindowSize();

  const containerSize = 276 + 32;
  const containerSizeSmall = 212 + 32;
  const containerCurrentSize = width < 640 ? containerSizeSmall : containerSize;
  // const currentPosition = containerCurrentSize * curElem;
  const maxTranslate = itemsList.length * containerCurrentSize;

  const handleStateChangeCurElem = (
    number: number | ((prev: number) => number),
  ) => {
    setCurElem(number);
  };

  useEffect(() => {
    if (width > maxTranslate) {
      setCurElem(0);
    }
  }, [width]);

  return (
    <section>
      <section className="flex justify-between">
        <h2 className="mb-6">Hot prices</h2>
        {width < maxTranslate && (
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
