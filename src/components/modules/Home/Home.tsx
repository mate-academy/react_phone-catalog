import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Slider } from "../../shared/Slider/Slider";
import { loadProducts } from "../../../features/ProductsSlice/ProductsSlice";
import Swiper from "swiper";
import { HomeSwiper } from "./HomeSwiper/HomeSwiper";

export const Home = () => {
  const dispatch = useAppDispatch();
    const hotPrices = useAppSelector(state => state.products.products)
        .filter(product => product.price)
        .slice(0, 20);

    useEffect(() => {
      dispatch(loadProducts());
    }, []);
  return (
    <>
      {/* {hotPrices.length > 0 && <Slider products={hotPrices} />} */}
      <HomeSwiper />
    </>
  )
};
