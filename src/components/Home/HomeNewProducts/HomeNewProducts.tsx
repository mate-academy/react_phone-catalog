import { useState } from "react";
import HomeNewProductsButtons from "./HomeNewProductsButtons";
import { useAppContext } from "../../../context/AppContext";
import HomeSlider from "../HomeSlider/HomeSlider";

const HomeNewProducts = () => {
  const { productsList } = useAppContext();
  const [curElem, setCurElem] = useState<number>(0);
  const newProducts = productsList.filter((el) => el.year >= 2022);

  const handleStateChangeCurElem = (
    number: number | ((prev: number) => number),
  ) => {
    setCurElem(number);
  };

  return (
    <section>
      <section className="mb-6 flex justify-between">
        <h2>Brand new models</h2>
        <HomeNewProductsButtons
          curElem={curElem}
          newProducts={newProducts}
          handleStateChangeCurElem={handleStateChangeCurElem}
        />
      </section>
      <HomeSlider curElem={curElem} newProducts={newProducts} />
    </section>
  );
};

export default HomeNewProducts;
