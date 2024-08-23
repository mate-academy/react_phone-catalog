import HomeNewProductsSlider from "./HomeNewProductsSlider/HomeNewProductsSlider";

const HomeNewProducts = () => {
  // const { phonesList } = useAppContext();

  return (
    <section className="max-w-full">
      <section className="mb-6 flex justify-between">
        <h2>Brand new models</h2>
      </section>
      <HomeNewProductsSlider />
    </section>
  );
};

export default HomeNewProducts;
