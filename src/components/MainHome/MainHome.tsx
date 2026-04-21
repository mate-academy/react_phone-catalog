import './MainHome.scss';
import { useEffect, useState } from 'react';
import BannerSwiper from './BannerSwiper/BannerSwiper';
import ProductSlider from '../ProductSlider/ProductSlider';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';
import { Product } from '../../types/Product';
import { getProducts } from '../../api';
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  const newModels = products.filter(product => product.year >= 2022);
  const hotPrices = products.filter(
    product => product.price < 850 && product.category === 'phones',
  );

  return (
    <div className="main">
      <h1 className="main__title">Welcome to Nice Gadgets store!</h1>
      <BannerSwiper />
      <ProductSlider
        title="Brand new models"
        products={newModels}
        favorites={favorites}
        setFavorites={setFavorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
      <div className="category__section">
        <h2 className="second__title">Shop by category</h2>
        <div className="categories">
          <CategoryPhones />
          <CategoryTablets />
          <CategoryAccessories />
        </div>
      </div>
      <ProductSlider
        title="Hot prices"
        products={hotPrices}
        favorites={favorites}
        setFavorites={setFavorites}
        baskets={baskets}
        setBaskets={setBaskets}
      />
    </div>
  );
};

export default Main;
