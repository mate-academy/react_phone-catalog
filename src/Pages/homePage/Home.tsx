import Main from '../../components/Main/MainHome';
import '../homePage/Home.scss';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type HomeProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Home = ({ favorites, baskets, setFavorites, setBaskets }: HomeProps) => {
  return (
    <>
      <div className="home">
        <Main
          favorites={favorites}
          baskets={baskets}
          setBaskets={setBaskets}
          setFavorites={setFavorites}
        />
      </div>
    </>
  );
};

export default Home;
