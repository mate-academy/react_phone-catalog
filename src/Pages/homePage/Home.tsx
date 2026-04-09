import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import { Product } from '../../types/Product';
import '../homePage/Home.scss';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type HomeProps = {
  favorites: Product[];
  baskets: FavoriteProduct[];
};

const Home = ({ favorites, baskets }: HomeProps) => {
  return (
    <>
      <div className="home">
        <Header favorites={favorites} baskets={baskets} />
        <Main />
        <Footer />{' '}
      </div>
    </>
  );
};

export default Home;
