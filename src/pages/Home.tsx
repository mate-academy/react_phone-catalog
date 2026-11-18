import Header from '../components/Header';
import NewModels from '../components/NewModels';
import Categories from '../components/Categories';
import HotPrices from '../components/HotPrices';
import Footer from '../components/Footer';
import { LocalProduct } from '../interface/Product';

const Home = ({
  favorites,
  setFavorites,
  products,
  setProducts,
}: {
  favorites: string[];
  products: LocalProduct[];
  setFavorites: (list: string[]) => void;
  setProducts: (list: LocalProduct[]) => void;
}) => {
  return (
    <section id="home">
      <Header />
      <NewModels
        favorites={favorites}
        setFavorites={setFavorites}
        products={products}
        setProducts={setProducts}
      />
      <Categories />
      <HotPrices
        favorites={favorites}
        setFavorites={setFavorites}
        products={products}
        setProducts={setProducts}
      />
      <Footer />
    </section>
  );
};

export default Home;
