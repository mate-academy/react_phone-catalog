import './Basket.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BasketMain from '../../components/BasketMain/BasketMain';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type BasketProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Basket = ({ favorites, baskets, setBaskets }: BasketProps) => {
  return (
    <div className="basket">
      <Header favorites={favorites} baskets={baskets} />
      <BasketMain baskets={baskets} setBaskets={setBaskets} />
      <Footer />
    </div>
  );
};

export default Basket;
