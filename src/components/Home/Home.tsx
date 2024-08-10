import HomeBanner from "./HomeBanner/HomeBanner";
import HomeNewProducts from "./HomeNewProducts/HomeNewProducts";

const Home = () => {
  return (
    <section className="mb-20 flex flex-col gap-20">
      <HomeBanner />
      <HomeNewProducts />
    </section>
  );
};

export default Home;
