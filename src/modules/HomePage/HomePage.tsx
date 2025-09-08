import { useEffect } from "react";
import { PicturesSlider } from "./components/PicturesSlider";
import { BrandNew } from "./components/BrandNew";
import { ShopByCategory } from "./components/ShopByCategory";
import { HotPrice } from "./components/HotPrice";
import { useAppSelector } from "../../app/store/hooks";
import { Spinner } from "../shared/components/Spinner";

export const HomePage = () => {
  const {isLoading} = useAppSelector(state => state.product);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
      <BrandNew />
      <ShopByCategory />
      <HotPrice />
    </>
  );
};
