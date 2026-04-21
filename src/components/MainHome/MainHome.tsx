import './MainHome.scss';
import Swiper from './BannerSwiper/BannerSwiper';
import NewModelsSlider from './NewModelsSlider/NewModelsSlider';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';
import HotPricesSwiper from './HotPricesSwiper/HotPricesSwiper';
import CategoryPhones from './CategoryPhones/CategoryPhones';
import CategoryTablets from './CategoryTablets/CategoryTablets';
import CategoryAccessories from './CategoryAccessories/CategoryAccessories';

type MainProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Main = ({ favorites, baskets, setFavorites, setBaskets }: MainProps) => {
  return (
    <div className="main">
      <h1 className="main__title">Welcome to Nice Gadgets store!</h1>
      <Swiper />
      <h2 className="second__title">Brand new models</h2>
      <NewModelsSlider
        baskets={baskets}
        setBaskets={setBaskets}
        setFavorites={setFavorites}
        favorites={favorites}
      />
      <div className="category__section">
        <h2 className="second__title">Shop by category</h2>
        <div className="categories">
          <CategoryPhones />
          <CategoryTablets />
          <CategoryAccessories />
        </div>
      </div>
      <h2 className="second__title">Hot prices</h2>
      <HotPricesSwiper
        favorites={favorites}
        setFavorites={setFavorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
    </div>
  );
};

export default Main;
