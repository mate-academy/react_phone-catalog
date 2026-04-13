import Main from '../../components/Main/Main';
import '../homePage/Home.scss';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type HomeProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
};

const Home = ({}: HomeProps) => {
  return (
    <>
      <div className="home">
        <Main />
      </div>
    </>
  );
};

export default Home;
