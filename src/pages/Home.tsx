import Header from '../components/Header';
import NewModels from '../components/NewModels';
import Categories from '../components/Categories';
import HotPrices from '../components/HotPrices';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <section id="home">
      <Header />
      <NewModels />
      <Categories />
      <HotPrices />
      <Footer />
    </section>
  );
};

export default Home;
