import { useState } from "react";
import HomeNewProductsButtons from "./HomeNewProductsSlider/HomeNewProductsButtons";
import HomeNewProductsSlider from "./HomeNewProductsSlider/HomeNewProductsSlider";
import { useAppContext } from "../../../context/AppContext";

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
    <section className="max-w-full">
      <section className="mb-6 flex justify-between">
        <h2>Brand new models</h2>
        <HomeNewProductsButtons
          curElem={curElem}
          newProducts={newProducts}
          handleStateChangeCurElem={handleStateChangeCurElem}
        />
      </section>
      <HomeNewProductsSlider curElem={curElem} newProducts={newProducts} />
    </section>
  );
};

export default HomeNewProducts;
