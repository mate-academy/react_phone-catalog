import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import '../homePage/Home.scss';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type HomeProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
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
