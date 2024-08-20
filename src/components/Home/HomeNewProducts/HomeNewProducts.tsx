import HomeNewProductsSlider from "./HomeNewProductsSlider/HomeNewProductsSlider";

const HomeNewProducts = () => {
  // const { phonesList } = useAppContext();

  return (
    <section>
      <h2 className="mb-6">Brand new models</h2>
      <HomeNewProductsSlider />
    </section>
  );
};

export default HomeNewProducts;
