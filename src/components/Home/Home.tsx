import HomeBanner from "./HomeBanner/HomeBanner";
import HomeCategories from "./HomeCategories/HomeCategories";
import HomeHotPrices from "./HomeHotPrices/HomeHotPrices";
import HomeNewProducts from "./HomeNewProducts/HomeNewProducts";

const Home = () => {
  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <HomeBanner />
      <HomeNewProducts />
      <HomeCategories />
      <HomeHotPrices />
    </section>
  );
};

export default Home;
