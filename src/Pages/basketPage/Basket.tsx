import './Basket.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BasketMain from '../../components/BasketMain/BasketMain';
import { Product } from '../../types/Product';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type BasketProps = {
  favorites: Product[];
  baskets: FavoriteProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const Basket = ({ favorites, baskets, setBaskets }: BasketProps) => {
  return (
    <div className="basket">
      <Header favorites={favorites} />
      <BasketMain baskets={baskets} setBaskets={setBaskets} />
      <Footer />
    </div>
  );
};

export default Basket;
